import { Controller, Post, Body, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { UpdateUserDto } from 'src/dtos/updateUser.dto';
  
  
  @Controller('users')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<User> {
      return this.userService.findOne(id);
    }
  
    
    @Get()
    async findAll(@Query('role') role?: string): Promise<User[]> {
      return this.userService.findAll(role);
    }
  

    @Put(':id')
    async update(
      @Param('id') id: number,
      @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
      return this.userService.update(id, updateUserDto);
    }
  
    
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
      return this.userService.remove(id);
    }
  }
  