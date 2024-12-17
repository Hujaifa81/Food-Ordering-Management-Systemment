import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { UpdateUserDto } from 'src/dtos/updateUser.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

    ) { }
    async findByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { email } });
    }
    
    //     const user = this.userRepository.create(createUserDto);
    //     return this.userRepository.save(user);
    //   }
    
      // Fetch a user by ID
      async findOne(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id },relations: ['customer', 'admin', 'rider'],  });
        if (!user) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
      }

    
    //     const users = await this.userRepository.find({ 
    //       where: role ? { role } : {}, 
    //       relations: ['customer', 'admin', 'rider'] 
    //     });
      
    //     return users.map(user => {
    //       // Filter out null relations
    //       const { customer, admin, rider, ...rest } = user;
    //       return {
    //         ...rest,
    //         ...(customer ? { customer } : {}),
    //         ...(admin ? { admin } : {}),
    //         ...(rider ? { rider } : {}),
    //       };
    //     });
    //   }
      
    
    //   Fetch all users or filter by role
      async findAll(role?: string): Promise<User[]> {
        if (role) {
          return this.userRepository.find({ where: { role },relations: ['customer', 'admin', 'rider'] });
        }
        return this.userRepository.find({ relations: ['customer', 'admin', 'rider'] });
      }

    
    //   async findAll(role?: string): Promise<User[]> {
    //     const query = this.userRepository.createQueryBuilder('user');
      
    //     // Include role-specific details
    //     query
    //       .leftJoinAndSelect('user.customer', 'customer')
    //       .leftJoinAndSelect('user.admin', 'admin')
    //       .leftJoinAndSelect('user.rider', 'rider');
      
    //     if (role) {
    //       query.where('user.role = :role', { role });
    //     }
      
    //     return query.getMany();
    //   }
      
      // Update a user
      
      async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);
        Object.assign(user, updateUserDto);
        return this.userRepository.save(user);
      }
    
      async remove(id: number): Promise<void> {
        const user = await this.findOne(id);
        await this.userRepository.remove(user);
      }
}
