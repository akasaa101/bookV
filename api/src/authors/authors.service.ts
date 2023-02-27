import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthorsDTO, UpdateAuthorDTO } from './dto/authors.dto';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(AuthorsService.name);

  async getAuthors() {
    this.logger.log('getAuthors service triggered');
    const authors = await this.prisma.author.findMany();
    this.logger.log('get authors successfully');
    return { message: true, authors };
  }
  async createAuthor(dto: AuthorsDTO) {
    this.logger.log(
      'createAuthor service triggered. author: ' + JSON.stringify(dto),
    );
    const { name } = dto;
    const author = await this.prisma.author.create({
      data: {
        name,
      },
    });
    this.logger.log('create author successfully. ' + author);
    return { message: true, author };
  }
  async updateAuthor(id: string, dto: UpdateAuthorDTO) {
    this.logger.log('updateAuthor service triggered. id: ' + id);
    const existingAuthor = await this.prisma.author.findUnique({
      where: { id: Number(id) },
    });

    if (!existingAuthor) throw new NotFoundException('author cannot found');

    const updatedAuthor = await this.prisma.author.update({
      where: { id: Number(id) },
      data: dto,
    });
    this.logger.log(
      'create author successfully. ' + JSON.stringify(updatedAuthor),
    );
    return { message: true, author: updatedAuthor };
  }
}
