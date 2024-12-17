import { Controller, Post, Get, Patch, Delete, Param, Body, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from 'src/dtos/addToCart.dto';
import { UpdateCartItemDto } from 'src/dtos/updateCartItem.dto';


@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  
  @Get(':customerId')
  async getCart(@Param('customerId') customerId: number) {
    return await this.cartService.getCart(customerId);
  }

  
  @Post(':customerId/add')
  async addToCart(
    @Param('customerId') customerId: number,
    @Body() addToCartDto: AddToCartDto,
  ) {
    const { menuItemId, quantity } = addToCartDto;
    return await this.cartService.addToCart(customerId, menuItemId, quantity);
  }

  
  @Put(':customerId/update/:cartItemId')
  async updateCartItem(
    @Param('customerId') customerId: number,
    @Param('cartItemId') cartItemId: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    const { quantity } = updateCartItemDto;
    return await this.cartService.updateQuantity(customerId, cartItemId, quantity);
  }

  
  @Delete(':customerId/remove/:cartItemId')
  async removeFromCart(
    @Param('customerId') customerId: number,
    @Param('cartItemId') cartItemId: number,
  ) {
    return await this.cartService.removeFromCart(customerId, cartItemId);
  }
}
