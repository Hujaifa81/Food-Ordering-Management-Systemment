import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFeedbackDto } from 'src/dtos/createFeedback.dto';
import { UpdateFeedbackDto } from 'src/dtos/updateFeedback.dto';
import { Customer } from 'src/entities/customer.entity';
import { Feedback } from 'src/entities/feedback.entity';
import { MenuItem } from 'src/entities/menu-item.entity';
import { Repository } from 'typeorm';


@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    const { customerId, menuItemId, comment, rating } = createFeedbackDto;

    
    const customer = await this.customerRepository.findOne({ where: { id: customerId } });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${customerId} not found`);
    }

    
    let menuItem = null;
    if (menuItemId) {
      menuItem = await this.menuItemRepository.findOne({ where: { id: menuItemId } });
      if (!menuItem) {
        throw new NotFoundException(`Menu item with ID ${menuItemId} not found`);
      }
    }

    const feedback = this.feedbackRepository.create({
      comment,
      rating,
      customer,
      menuItem,
    });

    return this.feedbackRepository.save(feedback);
  }

  async findAll(): Promise<Feedback[]> {
    return this.feedbackRepository.find({ relations: ['customer', 'menuItem'] });
  }

  async update(id: number, updateFeedbackDto: UpdateFeedbackDto): Promise<Feedback> {
    const feedback = await this.feedbackRepository.findOne({ where: { id } });
    if (!feedback) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }

    Object.assign(feedback, updateFeedbackDto);
    return this.feedbackRepository.save(feedback);
  }

  async delete(id: number): Promise<void> {
    const result = await this.feedbackRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }
  }
}
