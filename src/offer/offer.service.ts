import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOfferDto } from 'src/dtos/createOffer.dto';
import { UpdateOfferDto } from 'src/dtos/updateOffer.dto';
import { Customer } from 'src/entities/customer.entity';
import { MenuItem } from 'src/entities/menu-item.entity';
import { Offer } from 'src/entities/offer.entity';
import { NotificationSystemService } from 'src/notification-system/notification-system.service';
import { In, Repository } from 'typeorm';


@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,

    @InjectRepository(MenuItem)
    private readonly menuItemRepository: Repository<MenuItem>,
    @InjectRepository(Customer)
  private readonly customerRepository: Repository<Customer>, 

  private readonly notificationSystemService: NotificationSystemService, 

    
  ) {}

  
  async createOffer(createOfferDto: CreateOfferDto): Promise<Offer> {
    const { menuItemIds } = createOfferDto;

    const menuItems = await this.menuItemRepository.find({
      where: { id: In(menuItemIds) },
    });

    if (menuItems.length !== menuItemIds.length) {
      const missingIds = menuItemIds.filter(
        (id) => !menuItems.some((menuItem) => menuItem.id === id),
      );
      throw new NotFoundException(`Menu items not found: ${missingIds.join(', ')}`);
    }

    const offer = this.offerRepository.create({
      ...createOfferDto,
      menuItems,
    });

    // Notify customers
    const customers = await this.customerRepository.find({ relations: ['user'] });
    for (const customer of customers) {
      await this.notificationSystemService.create(customer.user.id, {
        message: `Exciting Offer: "${createOfferDto.title}" is now available!`,
        type: 'Promotional Offer',
      });
    }

    return await this.offerRepository.save(offer);
  }

  // Update an existing offer
  async updateOffer(offerId: number, updateOfferDto: UpdateOfferDto): Promise<Offer> {
    const offer = await this.offerRepository.findOne({
      where: { id: offerId },
      relations: ['menuItems'],
    });

    if (!offer) {
      throw new NotFoundException(`Offer with ID ${offerId} not found`);
    }

    if (updateOfferDto.title) offer.title = updateOfferDto.title;
    if (updateOfferDto.discountPercentage !== undefined) offer.discountPercentage = updateOfferDto.discountPercentage;
    if (updateOfferDto.startDate) offer.startDate = updateOfferDto.startDate;
    if (updateOfferDto.endDate) offer.endDate = updateOfferDto.endDate;
    if (updateOfferDto.active !== undefined) offer.active = updateOfferDto.active;

    if (updateOfferDto.menuItemIds) {
      offer.menuItems = [];
      const menuItems = await this.menuItemRepository.find({
        where: { id: In(updateOfferDto.menuItemIds) },
      });

      if (menuItems.length !== updateOfferDto.menuItemIds.length) {
        throw new NotFoundException('One or more menu items not found');
      }

      offer.menuItems = menuItems;
    }

    return this.offerRepository.save(offer);
  }

  
  async findOfferById(offerId: number): Promise<Offer> {
    const offer = await this.offerRepository.findOne({
      where: { id: offerId },
      relations: ['menuItems'],
    });

    if (!offer) {
      throw new NotFoundException(`Offer with ID ${offerId} not found`);
    }

    return offer;
  }

  
  async findAllOffers(): Promise<Offer[]> {
    return this.offerRepository.find({
      relations: ['menuItems'],
    });
  }

  
  async findActiveOffers(): Promise<Offer[]> {
    return this.offerRepository.find({
      where: { active: true },
      relations: ['menuItems'],
    });
  }

  
  async deactivateOffer(offerId: number): Promise<Offer> {
    const offer = await this.offerRepository.findOne({ where: { id: offerId } });

    if (!offer) {
      throw new NotFoundException(`Offer with ID ${offerId} not found`);
    }

    if (!offer.active) {
      throw new BadRequestException(`Offer with ID ${offerId} is already inactive`);
    }

    offer.active = false;
    return this.offerRepository.save(offer);
  }
}
