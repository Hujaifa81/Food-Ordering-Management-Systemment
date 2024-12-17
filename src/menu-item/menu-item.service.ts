import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMenuItemDto } from 'src/dtos/createMenuItem.dto';
import { UpdateMenuItemDto } from 'src/dtos/updateMenuItem.dto';
import { Category } from 'src/entities/category.entity';
import { Feedback } from 'src/entities/feedback.entity';
import { MenuItem } from 'src/entities/menu-item.entity';
import { Repository } from 'typeorm';


@Injectable()
export class MenuItemService {
  constructor(
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createMenuItemDto: CreateMenuItemDto): Promise<MenuItem> {
    const { name, price, categoryId } = createMenuItemDto;

    
    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    const menuItem = this.menuItemRepository.create({ name, price, category });
    return this.menuItemRepository.save(menuItem);
  }

  async findAll(): Promise<MenuItem[]> {
    return this.menuItemRepository.find({ relations: ['category', 'orders','feedbacks'] });
  }

  async findOne(id: number): Promise<MenuItem> {
    const menuItem = await this.menuItemRepository.findOne({
      where: { id },
      relations: ['category', 'orders','feedbacks'],
    });
    if (!menuItem) {
      throw new NotFoundException(`MenuItem with ID ${id} not found`);
    }
    return menuItem;
  }
  
async findFeedbackForMenuItem(menuItemId: number): Promise<Feedback[]> {
  const menuItem = await this.menuItemRepository.findOne({
    where: { id: menuItemId },
    relations: ['feedbacks'],
  });

  if (!menuItem) {
    throw new NotFoundException(`Menu item with ID ${menuItemId} not found`);
  }

  return menuItem.feedbacks; 
}


  async update(id: number, updateMenuItemDto: UpdateMenuItemDto): Promise<MenuItem> {
    const menuItem = await this.findOne(id);

    if (updateMenuItemDto.categoryId) {
      const category = await this.categoryRepository.findOne({ where: { id: updateMenuItemDto.categoryId } });
      if (!category) {
        throw new NotFoundException(`Category with ID ${updateMenuItemDto.categoryId} not found`);
      }
      menuItem.category = category;
    }

    Object.assign(menuItem, updateMenuItemDto);
    return this.menuItemRepository.save(menuItem);
  }

  async remove(id: number): Promise<void> {
    const menuItem = await this.findOne(id);
    await this.menuItemRepository.remove(menuItem);
  }
}
