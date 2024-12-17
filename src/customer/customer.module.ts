import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Customer } from 'src/entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
imports: [TypeOrmModule.forFeature([Customer,User])],
  providers: [CustomerService],
  controllers: [CustomerController],
  exports: [TypeOrmModule],
})
export class CustomerModule {}
