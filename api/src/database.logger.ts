import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LogDto } from './dto/log.dto';

export class DatabaseLogger extends Logger {
  private prisma: PrismaClient;

  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  async log(log: LogDto) {
    const { userId, tableName, action, data } = log;
    try {
      await this.prisma.log.create({
        data: {
          userId,
          tableName,
          action,
          data,
        },
      });
    } catch (e) {
      console.log('--------');
      console.log(e);
      console.log('--------');
    }
  }
}
