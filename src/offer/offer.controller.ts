import { Controller, Post, Body, Param, Put, Get, Delete, NotFoundException } from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from 'src/dtos/createOffer.dto';
import { Offer } from 'src/entities/offer.entity';
import { UpdateOfferDto } from 'src/dtos/updateOffer.dto';

@Controller('offers')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  // Create a new promotional offer
  @Post()
  async createOffer(@Body() createOfferDto: CreateOfferDto): Promise<Offer> {
    return this.offerService.createOffer(createOfferDto);
  }

  // Update an existing offer
  @Put(':id')
  async updateOffer(
    @Param('id') offerId: number,
    @Body() updateOfferDto: UpdateOfferDto
  ): Promise<Offer> {
    return this.offerService.updateOffer(offerId, updateOfferDto);
  }

  // Get an offer by its ID
  @Get(':id')
  async findOfferById(@Param('id') offerId: number): Promise<Offer> {
    return this.offerService.findOfferById(offerId);
  }

  // Get all offers
  @Get()
  async findAllOffers(): Promise<Offer[]> {
    return this.offerService.findAllOffers();
  }

  // Get all active offers
  @Get('active')
  async findActiveOffers(): Promise<Offer[]> {
    return this.offerService.findActiveOffers();
  }

  // Deactivate an offer by ID
  @Put('deactivate/:id')
  async deactivateOffer(@Param('id') offerId: number): Promise<Offer> {
    return this.offerService.deactivateOffer(offerId);
  }
}
