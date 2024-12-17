import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePaymentDto } from 'src/dtos/createPayment.dto';
import { UpdatePaymentDto } from 'src/dtos/updatePayment.dto';
import { Order } from 'src/entities/order.entity';
import { Payment } from 'src/entities/payment.entity';
import { Repository } from 'typeorm';


@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,  
  ) {}

 
  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { orderId, ...paymentData } = createPaymentDto;
  
   
    const order = await this.orderRepository.findOne({
      where: { id: orderId }, 
    });
  
    if (!order) {
      throw new Error('Order not found');
    }
  
    
    const payment = this.paymentRepository.create({
      ...paymentData,
      order,  
    });
  
   
    return this.paymentRepository.save(payment);
  }
  

  
  async update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
   
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: ['order'], 
    });
  
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
  
    const { orderId, ...paymentData } = updatePaymentDto;
  
    
    if (orderId) {
      const order = await this.orderRepository.findOne({ where: { id: orderId } });
      if (!order) {
        throw new NotFoundException(`Order with ID ${orderId} not found`);
      }
      payment.order = order; 
    }
  
    
    Object.assign(payment, paymentData);
  
    
    return this.paymentRepository.save(payment);
  }

  
  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: ['order'],
    });
  
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
  
    return payment;
  }
  

 
  async findByOrderId(orderId: number): Promise<Payment[]> {
    return this.paymentRepository.find({
      where: { order: { id: orderId } },
      relations: ['order'],
    });
  }
}
