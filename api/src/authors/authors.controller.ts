import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AuthorsDTO, UpdateAuthorDTO } from './dto/authors.dto';
import { AuthorsService } from './authors.service';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly AuthorsService: AuthorsService) {}

  @Get()
  getAuthors() {
    return this.AuthorsService.getAuthors();
  }

  @Post()
  createAuthor(@Body() dto: AuthorsDTO) {
    return this.AuthorsService.createAuthor(dto);
  }

  @Put('/:id')
  updateAuthor(@Body() dto: UpdateAuthorDTO, @Param() params: { id: string }) {
    return this.AuthorsService.updateAuthor(params.id, dto);
  }
}
