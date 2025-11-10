import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  isString,
  IsString,
  Max,
  MinLength,
} from 'class-validator';
import { UserTable } from 'src/db/schemas/user.schema';

export class CreaateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  password: string;

  @IsString()
  role: string;
}

export class FindUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  password: string;

  @IsString()
  role?: string;
}
