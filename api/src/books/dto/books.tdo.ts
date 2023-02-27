import {
  IsOptional,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
} from 'class-validator';
export class BooksDTO {
  @IsNotEmpty()
  @IsNumber()
  authorId: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  isbn: string;
}

export class UpdateBookDTO {
  @IsOptional()
  @IsNumber()
  authorId?: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  isbn?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;
}

export class UpdateBookPrices {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
