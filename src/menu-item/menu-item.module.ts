import { Module } from '@nestjs/common';
import { MenuItemService } from './menu-item.service';
import { MenuItemController } from './menu-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { MenuItem } from 'src/entities/menu-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItem,Category])],
  providers: [MenuItemService],
  controllers: [MenuItemController]
})
export class MenuItemModule {}
