import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';

import { Message } from 'src/entities/message.entity';
import { ChatGateway } from 'src/websocket.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
