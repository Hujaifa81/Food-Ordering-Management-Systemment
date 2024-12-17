import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { MenuItemService } from './menu-item.service';
import { CreateMenuItemDto } from 'src/dtos/createMenuItem.dto';
import { UpdateMenuItemDto } from 'src/dtos/updateMenuItem.dto';
import { Feedback } from 'src/entities/feedback.entity';

@Controller('menu-items')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Post()
  async create(@Body() createMenuItemDto: CreateMenuItemDto) {
    return this.menuItemService.create(createMenuItemDto);
  }

  @Get()
  async findAll() {
    return this.menuItemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.menuItemService.findOne(id);
  }
  @Get(':menuItemId/feedbacks')
  async findFeedbackForMenuItem(
    @Param('menuItemId', ParseIntPipe) menuItemId: number,
  ): Promise<Feedback[]> {
    return this.menuItemService.findFeedbackForMenuItem(menuItemId);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateMenuItemDto: UpdateMenuItemDto) {
    return this.menuItemService.update(id, updateMenuItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.menuItemService.remove(id);
  }
}
