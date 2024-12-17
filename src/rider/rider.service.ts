import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRiderDto } from 'src/dtos/createRider.dto';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { Rider } from 'src/entities/rider.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'; 
import { UpdateRiderDto } from 'src/dtos/updateRider.dto';
@Injectable()
export class RiderService {
    constructor(
        @InjectRepository(Rider)
        private riderRepository: Repository<Rider>,
        @InjectRepository(User)
        private userRepository: Repository<User>,

    ) { }

    
    async create(createRiderDto: CreateRiderDto, createUserDto: CreateUserDto): Promise<Rider> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10); 
        createUserDto.password = hashedPassword;
        const user = this.userRepository.create(createUserDto); 
        await this.userRepository.save(user); 

        
        const rider = this.riderRepository.create({
            user: user,
            vehicleDetails: createRiderDto.vehicleDetails,

        });

        return this.riderRepository.save(rider);
    }
    async findOne(id: number): Promise<Rider> {
        const rider = await this.riderRepository.findOne({
            where: { id },
            relations: ['user', 'orders'],
        });
        if (!rider) {
            throw new NotFoundException(`Rider with ID ${id} not found`);
        }
        return rider;
    }
    // Find all Riders
    async findAll(): Promise<Rider[]> {
        return this.riderRepository.find({ relations: ['user', 'orders'] });
    }
    async update(id: number, updateRiderDto: UpdateRiderDto): Promise<Rider> {
        // Find the rider by id
        const rider = await this.riderRepository.findOne({ where: { id } });
        if (!rider) {
          throw new NotFoundException(`Rider with ID ${id} not found`);
        }
      
        Object.assign(rider, updateRiderDto);
      
        if (updateRiderDto.userId) {
          const user = await this.userRepository.findOne({ where: { id: updateRiderDto.userId } });
          if (!user) {
            throw new NotFoundException(`User with ID ${updateRiderDto.userId} not found`);
          }
          rider.user = user;
        }
      
        return this.riderRepository.save(rider);
      }
      

  async remove(id: number): Promise<void> {
    const rider = await this.riderRepository.findOne({ where: { id } });
    if (!rider) {
      throw new NotFoundException(`Rider with ID ${id} not found`);
    }
    await this.riderRepository.remove(rider);
  }

}
