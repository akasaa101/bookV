import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { TRANSCODE_QUEUE } from './constants';
import axios from 'axios';
import { UpdateBookDTO } from './books/dto/books.tdo';
import { BooksService } from './books/books.service';

BooksService;
@Processor(TRANSCODE_QUEUE)
export class TranscodeConsumer {
  private readonly logger = new Logger(TranscodeConsumer.name);
  constructor(private readonly booksService: BooksService) {}

  @Process()
  async transcode(job: Job<unknown>) {
    this.logger.log('Transcoding message: ' + job.id);
    this.logger.debug('Data:', JSON.stringify(job.data));
    const data: any = job.data;
    const response = await axios.get(
      'https://63d25d4d1780fd6ab9c2bac7.mockapi.io/book',
    );
    const obj = response.data.find((item) => item.id === data.id.toString());
    const dto: UpdateBookDTO = { price: Number(obj.price) };
    await this.booksService.updateBook(data.id, dto);
  }
}
