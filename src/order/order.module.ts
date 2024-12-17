import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { Customer } from 'src/entities/customer.entity';
import { OrderController } from './order.controller';
import { MenuItem } from 'src/entities/menu-item.entity';
import { Rider } from 'src/entities/rider.entity';
import { Payment } from 'src/entities/payment.entity';
import { NotificationSystemModule } from 'src/notification-system/notification-system.module';
import { Cart } from 'src/entities/cart.entity';
import { CartModule } from 'src/cart/cart.module';


@Module({
    imports: [TypeOrmModule.forFeature([Order,Customer,MenuItem,Rider,Payment,Cart]),NotificationSystemModule,CartModule],
    controllers: [OrderController],
    providers: [OrderService]
})
export class OrderModule { }
