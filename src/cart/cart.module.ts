import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/entities/cart.entity';
import { CartItem } from 'src/entities/cartItem.entity';
import { MenuItem } from 'src/entities/menu-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart,CartItem,MenuItem])],
  controllers: [CartController],
  providers: [CartService],
  exports: [TypeOrmModule.forFeature([CartItem])]
 
})
export class CartModule {}
