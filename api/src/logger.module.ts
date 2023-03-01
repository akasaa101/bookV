import { Module } from '@nestjs/common';
import { DatabaseLogger } from './database.logger';

@Module({
  providers: [DatabaseLogger],
  exports: [DatabaseLogger],
})
export class LoggerModule {}
