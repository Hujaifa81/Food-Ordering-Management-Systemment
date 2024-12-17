import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from 'src/dtos/createCustomer.dto';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { UpdateCustomerDto } from 'src/dtos/updateCustomer.dto';
import { Customer } from 'src/entities/customer.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'; 
import { Feedback } from 'src/entities/feedback.entity';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
        @InjectRepository(User)
        private userRepository: Repository<User>,

    ) { }

    
    async create(createCustomerDto: CreateCustomerDto, createUserDto: CreateUserDto): Promise<Customer> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        
        createUserDto.password = hashedPassword;
        
        const user = this.userRepository.create(createUserDto);
        await this.userRepository.save(user);

        const customer = this.customerRepository.create({
            user: user, 
            address: createCustomerDto.address,
            contact: createCustomerDto.contact,
        });

        
        return this.customerRepository.save(customer);
    }

    
async findOne(id: number): Promise<Customer> {
    return this.customerRepository.findOne({
        where: { id },
        relations: ['user', 'orders'], 
    });
}


async findAll(): Promise<Customer[]> {
    return this.customerRepository.find({
        relations: ['user', 'orders'],
    });
}


async findFeedbackForCustomer(customerId: number): Promise<Feedback[]> {
    const customer = await this.customerRepository.findOne({
      where: { id: customerId },
      relations: ['feedbacks'],
    });
  
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${customerId} not found`);
    }
  
    return customer.feedbacks; 
  }
  
    async remove(id: number): Promise<void> {
        const customer = await this.customerRepository.findOne({
            where: { id }, 
        });

        if (!customer) {
            throw new Error('Customer not found');
        }

        await this.customerRepository.delete(customer); 
    }

   
    async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
        const customer = await this.findOne(id);
        Object.assign(customer, updateCustomerDto);
        return this.customerRepository.save(customer); 
    }

}
