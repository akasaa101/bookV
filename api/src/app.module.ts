import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from 'prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthorsController } from './authors/authors.controller';
import { AuthorsService } from './authors/authors.service';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { BullModule } from '@nestjs/bull';
import { TRANSCODE_QUEUE } from './constants';
import { TranscodeConsumer } from './transcode.consumer';
import { DatabaseLogger } from './database.logger';
import { LoggerModule } from './logger.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    JwtModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: TRANSCODE_QUEUE,
    }),
    LoggerModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController, AuthorsController, BooksController],
  providers: [
    AppService,
    PrismaService,
    AuthorsService,
    BooksService,
    JwtStrategy,
    TranscodeConsumer,
    {
      provide: Logger,
      useClass: DatabaseLogger,
    },
  ],
})
export class AppModule {}
