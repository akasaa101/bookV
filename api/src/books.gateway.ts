import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'prisma/prisma.service';

@WebSocketGateway({ cors: true })
export class BooksGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly prisma: PrismaService) {}

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client ${client.id} connected`);
  }

  @SubscribeMessage('bookList')
  async onBookList(client: any, data: any) {
    const bookList = await this.prisma.book.findMany();
    this.server.emit('bookList', bookList);
  }
}
