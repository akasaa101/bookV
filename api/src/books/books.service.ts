import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { BooksDTO, UpdateBookDTO, UpdateBookPrices } from './dto/books.tdo';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { TRANSCODE_QUEUE } from 'src/constants';
import { DatabaseLogger } from 'src/database.logger';
@Injectable()
export class BooksService {
  constructor(
    @InjectQueue(TRANSCODE_QUEUE) private readonly transcodeQueue: Queue,
    private prisma: PrismaService,
    private readonly logger: DatabaseLogger,
  ) {}

  async getBooks() {
    this.logger.log({
      userId: null,
      tableName: 'book',
      data: JSON.stringify({
        message: 'BookService.getBooks triggered',
      }),
      action: 'SELECT',
    });
    const books = await this.prisma.book.findMany();
    return { message: true, books };
  }

  async createBook(dto: BooksDTO, username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      throw new Error(`User ${username} not found`);
    }
    this.logger.log({
      userId: user.id,
      tableName: 'book',
      data: JSON.stringify({
        message: 'BookService.createBook triggered',
      }),
      action: 'INSERT',
    });
    const author = await this.prisma.author.findUnique({
      where: { id: dto.authorId },
    });
    if (!author) {
      throw new Error(`Author ${dto.authorId} not found`);
    }
    const book = await this.prisma.book.create({
      data: {
        author: { connect: { id: author.id } },
        title: dto.title,
        description: dto.description,
        isbn: dto.isbn,
        user: { connect: { id: user.id } },
      },
    });
    this.logger.log({
      userId: user.id,
      tableName: 'book',
      data: JSON.stringify({
        message: 'BookService.createBook, successfully created book',
        book,
      }),
      action: 'INSERT',
    });
    return { message: true, book };
  }

  async updateBook(bookId: string, dto: UpdateBookDTO) {
    this.logger.log({
      userId: null,
      tableName: 'book',
      data: JSON.stringify({
        message: 'BookService.updateBook triggered',
        bookId,
        dto,
      }),
      action: 'INSERT',
    });
    const updatedBook = await this.prisma.book.update({
      where: { id: Number(bookId) },
      data: dto,
    });
    this.logger.log({
      userId: null,
      tableName: 'book',
      data: JSON.stringify({
        message: 'BookService.updateBook successffully',
        bookId,
        dto,
      }),
      action: 'INSERT',
    });
    return { message: true, book: updatedBook };
  }

  async deleteBook(id: number) {
    this.logger.log({
      userId: null,
      tableName: 'book',
      data: JSON.stringify({
        message: 'BookService.deleteBook triggered',
        id,
      }),
      action: 'DELETE',
    });
    const existingBook = await this.prisma.book.findUnique({
      where: { id: Number(id) },
    });
    if (!existingBook) throw new NotFoundException('book cannot find');
    await this.prisma.book.delete({
      where: { id: Number(id) },
    });
    this.logger.log({
      userId: null,
      tableName: 'book',
      data: JSON.stringify({
        message: 'BookService.deleteBook successfully',
        id,
      }),
      action: 'DELETE',
    });
    return { message: true };
  }

  async updatePrices() {
    this.logger.log({
      userId: null,
      tableName: 'book',
      data: JSON.stringify({
        message: 'BookService.updatePrices triggered',
      }),
      action: 'INSERT',
    });
    const books = await this.prisma.book.findMany();
    for (const book of books) {
      const bookDto = new UpdateBookPrices();
      bookDto.id = book.id;
      await this.transcodeQueue.add(bookDto);
    }
    this.logger.log({
      userId: null,
      tableName: 'book',
      data: JSON.stringify({
        message:
          'BookService.updatePrices successfully. All Books added to queue',
      }),
      action: 'INSERT',
    });
    return { message: true };
  }
}
