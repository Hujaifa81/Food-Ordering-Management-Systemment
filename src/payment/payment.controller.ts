import { Controller, Post, Body, Param, Put, Get } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from 'src/dtos/createPayment.dto';
import { Payment } from 'src/entities/payment.entity';
import { UpdatePaymentDto } from 'src/dtos/updatePayment.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  
  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentService.create(createPaymentDto);
  }

  
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    return this.paymentService.update(id, updatePaymentDto);
  }

  
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Payment> {
    return this.paymentService.findOne(id);
  }

  
  @Get('order/:orderId')
  async findByOrderId(@Param('orderId') orderId: number): Promise<Payment[]> {
    return this.paymentService.findByOrderId(orderId);
  }
}
