import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminDto } from 'src/dtos/createAdmin.dto';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { UpdateAdminDto } from 'src/dtos/updateAdmin.dto';
import { Admin } from 'src/entities/admin.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'; 
@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private adminRepository: Repository<Admin>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }
    
    async create(createAdminDto: CreateAdminDto, createUserDto: CreateUserDto): Promise<Admin> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10); 
                
                createUserDto.password = hashedPassword;
        
        const user = this.userRepository.create(createUserDto);
        await this.userRepository.save(user);

        
        const admin = this.adminRepository.create({
            ...createAdminDto,
            user,
        });
        return this.adminRepository.save(admin);
    }

    
    async findOne(id: number): Promise<Admin> {
        return this.adminRepository.findOne({
            where: { id },
            relations: ['user'], 
        });
    }

    
    async findAll(): Promise<Admin[]> {
        return this.adminRepository.find({ relations: ['user'] });
    }

    
    async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
        const admin = await this.findOne(id);
        if (!admin) {
            throw new Error('Admin not found');
        }
        Object.assign(admin, updateAdminDto); 
        return this.adminRepository.save(admin);
    }
    
    async remove(id: number, currentAdmin: any): Promise<void> {
        
        if (currentAdmin?.permissions !== 'full-access') {
            throw new ForbiddenException('You do not have permission to delete an admin.');
        }
    
        
        const admin = await this.adminRepository.findOne({ where: { id } });
        if (!admin) {
            throw new NotFoundException(`Admin with ID ${id} not found`);
        }
    
        
        await this.adminRepository.delete(id);
    }
    

}
