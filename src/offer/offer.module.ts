import { Module } from '@nestjs/common';
import { OfferController } from './offer.controller';
import { OfferService } from './offer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from 'src/entities/offer.entity';
import { MenuItem } from 'src/entities/menu-item.entity';
import { CustomerModule } from 'src/customer/customer.module';
import { NotificationSystemService } from 'src/notification-system/notification-system.service';
import { NotificationSystemModule } from 'src/notification-system/notification-system.module';

@Module({
  imports: [TypeOrmModule.forFeature([Offer,MenuItem]),CustomerModule, NotificationSystemModule,],
  controllers: [OfferController],
  providers: [OfferService,NotificationSystemService]
})
export class OfferModule {}
