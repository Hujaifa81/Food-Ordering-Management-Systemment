import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateUserDto } from "src/dtos/createUser.dto";
import { CreateAdminDto } from "src/dtos/createAdmin.dto";
import { UpdateAdminDto } from "src/dtos/updateAdmin.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Request } from '@nestjs/common';
import { Admin } from "src/entities/admin.entity";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/auth/roles.decorator";

@Controller('admins')
 
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Post()
    async create(
        @Body('user') createUserDto: CreateUserDto, 
        @Body('admin') createAdminDto: CreateAdminDto, 
    ): Promise<Admin> {
        return this.adminService.create(createAdminDto, createUserDto); 
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Admin> {
        return this.adminService.findOne(id);
    }

    @Get()
    async findAll(): Promise<Admin[]> {
        return this.adminService.findAll();
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updateAdminDto: UpdateAdminDto,
    ): Promise<Admin> {
        return this.adminService.update(id, updateAdminDto);
    }
    
    @UseGuards(JwtAuthGuard, RolesGuard) 
    @Delete(':id')
    @Roles('admin') 
    async deleteAdmin(@Param('id') id: number, @Request() req): Promise<void> {
        
      const currentAdmin = req.user; 
      return this.adminService.remove(id, currentAdmin);
    }
}

