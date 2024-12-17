import { Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRiderDto } from 'src/dtos/createRider.dto';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { Rider } from 'src/entities/rider.entity';
import { RiderService } from './rider.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Request } from '@nestjs/common';
import { UpdateRiderDto } from 'src/dtos/updateRider.dto';

@Controller('riders')
export class RiderController {
    constructor(private readonly riderService: RiderService) { }
    @Post()
    async create(
        @Body('user') createUserDto: CreateUserDto, 
        @Body('rider') createRiderDto: CreateRiderDto 
    ): Promise<Rider> {
        return this.riderService.create(createRiderDto, createUserDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('rider', 'admin')
    @Get(':id')
    async findOne(@Param('id') id: number, @Request() req): Promise<Rider> {
        const currentUserId = req.user.userId; 
        const currentUserRole = req.user.role;

        const rider = await this.riderService.findOne(id);

        
        if (currentUserRole !== 'admin' && rider.user.id !== currentUserId) {
            throw new UnauthorizedException('You can only view your own customer data.');
        }

        
        return this.riderService.findOne(id);
    }
    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    async findAll(): Promise<Rider[]> {
        return this.riderService.findAll();
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('rider', 'admin')
    @Put(':id')
    async update(@Param('id') id: number, @Body() updateRiderDto: UpdateRiderDto, @Request() req): Promise<Rider> {
        const currentUserId = req.user.userId; 
        const currentUserRole = req.user.role;

        
        const rider = await this.riderService.findOne(id);

        if (currentUserRole !== 'admin' && rider.user.id !== currentUserId) {
            throw new UnauthorizedException('You can only view your own customer data.');
        }
        return this.riderService.update(id, updateRiderDto); 
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.riderService.remove(id);
    }


}
