import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards, ForbiddenException, UnauthorizedException, ParseIntPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from 'src/entities/customer.entity';
import { CreateCustomerDto } from 'src/dtos/createCustomer.dto';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Request } from '@nestjs/common';
import { UpdateCustomerDto } from 'src/dtos/updateCustomer.dto';
import { Feedback } from 'src/entities/feedback.entity';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(
    @Body('user') createUserDto: CreateUserDto, 
    @Body('customer') createCustomerDto: CreateCustomerDto 
  ): Promise<Customer> {
    return this.customerService.create(createCustomerDto, createUserDto); 
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('customer','admin')
  @Get(':id')
  async findOne(@Param('id') id: number, @Request() req): Promise<Customer> {
    const currentUserId = req.user.userId; 
    const currentUserRole = req.user.role;

 
  const customer = await this.customerService.findOne(id);

  
  if (currentUserRole !=='admin' && customer.user.id !== currentUserId) {
    throw new UnauthorizedException('You can only view your own customer data.');
  }

    
    return this.customerService.findOne(id);
  }
 
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }
  @Get(':customerId/feedbacks')
    async findFeedbackForCustomer(@Param('customerId', ParseIntPipe) customerId: number,): Promise<Feedback[]> {
      return this.customerService.findFeedbackForCustomer(customerId);
    }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('customer','admin')
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCustomerDto: UpdateCustomerDto,@Request() req): Promise<Customer> {
    const currentUserId = req.user.userId; 
    const currentUserRole = req.user.role;

  
  const customer = await this.customerService.findOne(id);

  
  if (currentUserRole !=='admin' && customer.user.id !== currentUserId) {
    throw new UnauthorizedException('You can only view your own customer data.');
  }
    return this.customerService.update(id, updateCustomerDto); 
  }
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.customerService.remove(id);
  }
}
