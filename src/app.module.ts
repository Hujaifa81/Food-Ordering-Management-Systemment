import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { RiderModule } from './rider/rider.module';
import { OrderModule } from './order/order.module';
import { MenuItemModule } from './menu-item/menu-item.module';
import { CategoryModule } from './category/category.module';
import { PaymentModule } from './payment/payment.module';

import { NotificationSystemModule } from './notification-system/notification-system.module';
import { FeedbackModule } from './feedback/feedback.module';
import { OfferModule } from './offer/offer.module';
import { CartModule } from './cart/cart.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'food-ordering-system',
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
  }), UserModule, CustomerModule,AuthModule, AdminModule, RiderModule, OrderModule, MenuItemModule, CategoryModule, PaymentModule, NotificationSystemModule, FeedbackModule, OfferModule, CartModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
