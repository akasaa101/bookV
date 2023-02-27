import { IsNotEmpty, IsString, Length } from 'class-validator';
export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 16, { message: 'username has to be at between 6 and 16 chars' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 16, { message: 'displayName has to be at between 6 and 16 chars' })
  displayName: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 16, { message: 'password has to be at between 6 and 16 chars' })
  password: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 16, { message: 'username has to be at between 6 and 16 chars' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 16, { message: 'password has to be at between 6 and 16 chars' })
  password: string;
}
