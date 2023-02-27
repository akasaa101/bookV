import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
export class AuthorsDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateAuthorDTO {
  @IsOptional()
  @IsString()
  name?: string;
}
