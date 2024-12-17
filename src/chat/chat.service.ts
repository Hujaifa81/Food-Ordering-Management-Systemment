import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Message } from "src/entities/message.entity";
import { Repository } from "typeorm";

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

//   async getMessages(senderId: string, receiverId: string): Promise<Message[]> {
//     return this.messageRepository.find({
//       where: [
//         { sender: { id: senderId }, receiver: { id: receiverId } },
//         { sender: { id: receiverId }, receiver: { id: senderId } },
//       ],
//       order: { sentAt: 'ASC' },
//     });
//   }

//   async sendMessage(senderId: string, receiverId: string, message: string): Promise<Message> {
//     const newMessage = this.messageRepository.create({
//       sender: { id: senderId },
//       receiver: { id: receiverId },
//       message,
//     });
//     await this.messageRepository.save(newMessage);
//     return newMessage;
//   }

//   async markMessageAsRead(messageId: number): Promise<void> {
//     const message = await this.messageRepository.findOne(messageId);
//     if (message) {
//       message.read = true;
//       await this.messageRepository.save(message);
//     }
//   }
}
