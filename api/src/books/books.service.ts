import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { BooksDTO, UpdateBookDTO, UpdateBookPrices } from './dto/books.tdo';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { TRANSCODE_QUEUE } from 'src/constants';

@Injectable()
export class BooksService {
  constructor(
    @InjectQueue(TRANSCODE_QUEUE) private readonly transcodeQueue: Queue,
    private prisma: PrismaService,
  ) {}
  private readonly logger = new Logger(BooksService.name);

  async getBooks() {
    this.logger.log('getBooks service triggered');
    const books = await this.prisma.book.findMany();
    return { message: true, books };
  }

  async createBook(dto: BooksDTO, username: string) {
    this.logger.log(
      'createBook service triggered. username: ' +
        username +
        '. book: ' +
        JSON.stringify(dto),
    );
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      throw new Error(`User ${username} not found`);
    }
    const book = await this.prisma.book.create({
      data: {
        title: dto.title,
        description: dto.description,
        isbn: dto.isbn,
        user: { connect: { id: user.id } },
      },
    });
    this.logger.log('create book successfully. book: ' + JSON.stringify(book));
    return { message: true, book };
  }

  async updateBook(bookId: string, dto: UpdateBookDTO) {
    this.logger.log('updateBook service triggered. bookId: ' + bookId);
    const updatedBook = await this.prisma.book.update({
      where: { id: Number(bookId) },
      data: dto,
    });
    this.logger.log(
      'update book successfully. book: ' + JSON.stringify(updatedBook),
    );
    return { message: true, book: updatedBook };
  }

  async deleteBook(id: number) {
    this.logger.log('deleteBook service triggered. id: ' + id);
    const existingBook = await this.prisma.book.findUnique({
      where: { id: Number(id) },
    });
    if (!existingBook) throw new NotFoundException('book cannot find');
    await this.prisma.book.delete({
      where: { id: Number(id) },
    });
    this.logger.log('delete book successfully. id: ' + id);
    return { message: true };
  }

  async updatePrices() {
    this.logger.log('updatePrices service triggered. books adding to queue.');
    const books = await this.prisma.book.findMany();
    for (const book of books) {
      const bookDto = new UpdateBookPrices();
      bookDto.id = book.id;
      await this.transcodeQueue.add(bookDto);
    }
    this.logger.log('adding queue all books successfully');
    return { message: true };
  }
}
