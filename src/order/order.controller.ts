import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from 'src/entities/order.entity';
import { CreateOrderDto } from 'src/dtos/createOrder.dto';
import { UpdateOrderDto } from 'src/dtos/updateOrder.dto';


@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Get()
  async findAll() {
    return this.orderService.findAll();
  }
  @Get('customer/:id/orders')
  async getCustomerOrders(@Param('id') id: number): Promise<Order[]> {
    return this.orderService.findOrdersByCustomer(id);
  }
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Order> {
      return this.orderService.findOne(id);
  }
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }
  @Put(':id')
  async updateOrder(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(id, updateOrderDto);
  }
  @Delete(':id')
  async deleteOrder(@Param('id') id: number) {
    return this.orderService.remove(id);
  }

}
