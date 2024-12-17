import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private connectedUsers: string[] = [];

  // Triggered when a user connects
  handleConnection(socket: Socket) {
    console.log(`User connected: ${socket.id}`);
    this.connectedUsers.push(socket.id);
  }

  // Triggered when a user disconnects
  handleDisconnect(socket: Socket) {
    console.log(`User disconnected: ${socket.id}`);
    this.connectedUsers = this.connectedUsers.filter(id => id !== socket.id);
  }

  // Listen for messages
  @SubscribeMessage('send_message')
  handleMessage(@MessageBody() data: { senderId: string, receiverId: string, message: string }) {
    // Save message to the database (optional)
    // Broadcast message to the receiver
    this.server.to(data.receiverId).emit('receive_message', data);
  }
}
