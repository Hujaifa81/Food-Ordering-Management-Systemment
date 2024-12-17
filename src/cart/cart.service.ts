import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart } from "src/entities/cart.entity";
import { CartItem } from "src/entities/cartItem.entity";
import { MenuItem } from "src/entities/menu-item.entity";
import { Repository } from "typeorm";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
  ) {}


async addToCart(customerId: number, menuItemId: number, quantity: number): Promise<Cart> {
    
    let cart = await this.cartRepository.findOne({
        where: { customer: { id: customerId } },
        relations: ['items', 'items.menuItem', 'items.menuItem.offers'],
    });

    if (!cart) {
        cart = this.cartRepository.create({
            customer: { id: customerId },
            items: [],
            totalAmount: 0,
        });
        cart = await this.cartRepository.save(cart);
    }

   
    const menuItem = await this.menuItemRepository.findOne({
        where: { id: menuItemId },
        relations: ['offers'],
    });
    if (!menuItem) {
        throw new NotFoundException(`Menu item with ID ${menuItemId} not found`);
    }

    
    const menuItemPrice =
        typeof menuItem.price === 'string' ? parseFloat(menuItem.price) : menuItem.price;
    if (isNaN(menuItemPrice)) {
        throw new Error(`Invalid price for menu item ID ${menuItemId}`);
    }

    
    const activeOffer = menuItem.offers?.find(
        (offer) => offer.active && (!offer.endDate || offer.endDate >= new Date())
    );
    const discountPercentage = activeOffer
        ? typeof activeOffer.discountPercentage === 'string'
            ? parseFloat(activeOffer.discountPercentage)
            : activeOffer.discountPercentage
        : 0;

    const discount = (menuItemPrice * discountPercentage) / 100;
    const discountedPrice = menuItemPrice - discount;

   
    const totalPriceForItem = discountedPrice * quantity;

    
    const cartItem = this.cartItemRepository.create({
        cart,
        menuItem,
        quantity,
        price: discountedPrice, 
    });

    if (!cart.items) {
        cart.items = [];
    }
    cart.items.push(cartItem);

    
    const currentTotalAmount = typeof cart.totalAmount === 'string'
        ? parseFloat(cart.totalAmount)
        : cart.totalAmount;

    
    cart.totalAmount = parseFloat((currentTotalAmount + totalPriceForItem).toFixed(2)); 

    
    await this.cartItemRepository.save(cartItem);
    cart = await this.cartRepository.save(cart);

    return cart;
}



  async removeFromCart(customerId: number, cartItemId: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { customer: { id: customerId } },
      relations: ['items'],
    });

    if (!cart) {
      throw new NotFoundException(`Cart for customer with ID ${customerId} not found`);
    }

    const cartItem = cart.items.find((item) => item.id === cartItemId);
    if (!cartItem) {
      throw new NotFoundException(`Cart item with ID ${cartItemId} not found`);
    }

    cart.items = cart.items.filter((item) => item.id !== cartItemId);
    cart.totalAmount -= cartItem.price * cartItem.quantity;

    await this.cartRepository.save(cart);
    return cart;
  }

  async getCart(customerId: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { customer: { id: customerId } },
      relations: ['items', 'items.menuItem'],
    });

    if (!cart) {
      throw new NotFoundException(`Cart for customer with ID ${customerId} not found`);
    }

    return cart;
  }

  async updateQuantity(customerId: number, cartItemId: number, quantity: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { customer: { id: customerId } },
      relations: ['items'],
    });

    if (!cart) {
      throw new NotFoundException(`Cart for customer with ID ${customerId} not found`);
    }

    const cartItem = cart.items.find((item) => item.id === cartItemId);
    if (!cartItem) {
      throw new NotFoundException(`Cart item with ID ${cartItemId} not found`);
    }

    const priceDifference = (quantity - cartItem.quantity) * cartItem.price;
    cart.totalAmount += priceDifference;
    cartItem.quantity = quantity;

    await this.cartRepository.save(cart);
    return cart;
  }
}
