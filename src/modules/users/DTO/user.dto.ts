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
import { UserTable } from 'src/db/schemas';

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
