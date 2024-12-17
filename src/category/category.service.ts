import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from 'src/dtos/createCategory.dto';
import { UpdateCategoryDto } from 'src/dtos/updateCategory';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';


@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['menuItems'] });
  }

  async findById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['menuItems'],
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findById(id); 
    Object.assign(category, updateCategoryDto);
    return this.categoryRepository.save(category);
  }

  async delete(id: number): Promise<void> {
    const category = await this.findById(id);
    await this.categoryRepository.remove(category);
  }
}
