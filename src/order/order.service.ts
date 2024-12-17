import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from 'src/dtos/createOrder.dto';
import { UpdateOrderDto } from 'src/dtos/updateOrder.dto';
import { Cart } from 'src/entities/cart.entity';
import { CartItem } from 'src/entities/cartItem.entity';
import { Customer } from 'src/entities/customer.entity';
import { MenuItem } from 'src/entities/menu-item.entity';
import { Order } from 'src/entities/order.entity';
import { Payment } from 'src/entities/payment.entity';
import { Rider } from 'src/entities/rider.entity';
import { NotificationSystemService } from 'src/notification-system/notification-system.service';
import { In, Repository } from 'typeorm';


@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
        @InjectRepository(MenuItem)
        private menuItemRepository: Repository<MenuItem>,
        @InjectRepository(Rider)
        private riderRepository: Repository<Rider>,
        @InjectRepository(Payment)
        private paymentRepository: Repository<Payment>,
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
        @InjectRepository(CartItem)
        private readonly cartItemRepository: Repository<CartItem>,
        private readonly notificationSystemService: NotificationSystemService,

    ) { }

   
    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        const { customerId,deliveryAddress} = createOrderDto;
        
        const cart = await this.cartRepository.findOne({
            where: { customer: { id: customerId } },
            relations: ['items', 'items.menuItem'],
        });

        if (!cart || cart.items.length === 0) {
            throw new NotFoundException(`Cart is empty for customer with ID ${customerId}`);
        }

        
        const totalAmount = cart.totalAmount;

        
        const order = this.orderRepository.create({
            customer: { id: customerId },
            menuItems: cart.items.map((item) => item.menuItem),
            totalAmount,
            deliveryAddress,
            status: 'Pending',
        });
        const savedOrder = await this.orderRepository.save(order);

        
        const payment = this.paymentRepository.create({
            order: savedOrder,
            amount: savedOrder.totalAmount,
            paymentStatus: 'Pending',
            paymentMethod: 'Cash On Delivery', 
            paymentDate: new Date(),
        });
        await this.paymentRepository.save(payment);

        
        const customer = await this.customerRepository.findOne({
            where: { id: customerId },
            relations: ['user'],
        });
        if (customer?.user) {
            await this.notificationSystemService.create(customer.user.id, {
                message: `Your order #${savedOrder.id} has been placed successfully.`,
                type: 'Order Update',
            });
        }

       
        await this.cartItemRepository.remove(cart.items);
        await this.cartRepository.remove(cart);

        return savedOrder;
    }


    async findAll(): Promise<Order[]> {
        return this.orderRepository.find({ relations: ['customer', 'menuItems'] });
    }

    async findOne(id: number): Promise<Order> {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['customer', 'menuItems'],
        });
        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }
    async findOrdersByCustomer(customerId: number): Promise<Order[]> {
        const orders = await this.orderRepository.find({
            where: { customer: { id: customerId } }, 
            relations: ['menuItems', 'customer'], 
        });

        if (orders.length === 0) {
            throw new NotFoundException(`No orders found for customer with ID ${customerId}`);
        }

        return orders;
    }
    
    async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
        const order = await this.findOne(id);

        const { customerId, menuItemIds, riderId } = updateOrderDto;

       
        if (customerId) {
            const customer = await this.customerRepository.findOne({ where: { id: customerId } });
            if (!customer) {
                throw new NotFoundException(`Customer with ID ${customerId} not found`);
            }
            order.customer = customer;
        }

        
        if (riderId) {
            const rider = await this.riderRepository.findOne({ where: { id: riderId } });
            if (!rider) {
                throw new NotFoundException(`Rider with ID ${riderId} not found`);
            }
            order.rider = rider;
            order.status = 'Out for Delivery'; 
        }

        
        if (menuItemIds) {
            const menuItems = await this.menuItemRepository.find({
                where: { id: In(menuItemIds) },
            });

            if (menuItems.length !== menuItemIds.length) {
                throw new NotFoundException(`One or more menu items not found`);
            }

            
            let totalAmount = 0;
            menuItems.forEach((menuItem) => {
                const activeOffer = menuItem.offers?.find(
                    (offer) => offer.active && (!offer.endDate || offer.endDate >= new Date())
                );
                const discount = activeOffer ? (menuItem.price * activeOffer.discountPercentage) / 100 : 0;
                totalAmount += menuItem.price - discount;
            });

            order.menuItems = menuItems;
            order.totalAmount = totalAmount;
        }

        
        Object.assign(order, updateOrderDto);

        return this.orderRepository.save(order);
    }




    async remove(id: number): Promise<void> {
        const order = await this.findOne(id);
        await this.orderRepository.remove(order);
    }
}
