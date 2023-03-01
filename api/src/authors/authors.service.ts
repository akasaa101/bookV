import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthorsDTO, UpdateAuthorDTO } from './dto/authors.dto';
import { DatabaseLogger } from 'src/database.logger';
@Injectable()
export class AuthorsService {
  constructor(
    private prisma: PrismaService,
    private readonly logger: DatabaseLogger,
  ) {}

  async getAuthors() {
    this.logger.log({
      userId: null,
      tableName: 'author',
      data: JSON.stringify({
        message: 'AuthorsService.getAuthors triggered',
      }),
      action: 'SELECT',
    });
    const authors = await this.prisma.author.findMany();
    this.logger.log({
      userId: null,
      tableName: 'author',
      data: JSON.stringify({
        message: 'AuthorsService.getAuthors successfully',
      }),
      action: 'SELECT',
    });
    return { message: true, authors };
  }
  async createAuthor(dto: AuthorsDTO) {
    this.logger.log({
      userId: null,
      tableName: 'author',
      data: JSON.stringify({
        message: 'AuthorsService.createAuthor triggered',
        dto,
      }),
      action: 'INSERT',
    });
    const { name } = dto;
    const author = await this.prisma.author.create({
      data: {
        name,
      },
    });
    this.logger.log({
      userId: null,
      tableName: 'author',
      data: JSON.stringify({
        message: 'AuthorsService.createAuthor successfully',
        author,
      }),
      action: 'INSERT',
    });
    return { message: true, author };
  }
  async updateAuthor(id: string, dto: UpdateAuthorDTO) {
    this.logger.log({
      userId: null,
      tableName: 'author',
      data: JSON.stringify({
        message: 'AuthorsService.updateAuthor triggered',
        id,
        dto,
      }),
      action: 'UPDATE',
    });
    const existingAuthor = await this.prisma.author.findUnique({
      where: { id: Number(id) },
    });

    if (!existingAuthor) throw new NotFoundException('author cannot found');

    const updatedAuthor = await this.prisma.author.update({
      where: { id: Number(id) },
      data: dto,
    });
    this.logger.log({
      userId: null,
      tableName: 'author',
      data: JSON.stringify({
        message: 'AuthorsService.updateAuthor successfully',
        updatedAuthor,
      }),
      action: 'UPDATE',
    });
    return { message: true, author: updatedAuthor };
  }
}
