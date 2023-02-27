import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { BooksDTO, UpdateBookDTO } from './dto/books.tdo';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getBooks() {
    return this.booksService.getBooks();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createBook(@Request() req, @Body() dto: BooksDTO) {
    return this.booksService.createBook(dto, req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  updateBook(
    @Request() req,
    @Param() params: { id: string },
    @Body() dto: UpdateBookDTO,
  ) {
    return this.booksService.updateBook(params.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteBook(@Param() params: { id: number }) {
    return this.booksService.deleteBook(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/update-prices')
  async updatePrices() {
    return this.booksService.updatePrices();
  }
}
