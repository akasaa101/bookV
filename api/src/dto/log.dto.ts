import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

enum Action {
  SELECT = 'SELECT',
  INSERT = 'INSERT',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export class LogDto {
  @IsOptional()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsString()
  tableName: string;

  @IsEnum(Action)
  action: keyof typeof Action;

  @IsOptional()
  @IsString()
  data: string;
}
