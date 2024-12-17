import { Module } from '@nestjs/common';
import { RiderController } from './rider.controller';
import { RiderService } from './rider.service';
import { Rider } from 'src/entities/rider.entity';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Rider,User,Order])],
  controllers: [RiderController],
  providers: [RiderService]
})
export class RiderModule {}
