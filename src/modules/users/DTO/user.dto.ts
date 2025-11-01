import {
  IsEmail,
  IsEnum,
  IsNumber,
  isString,
  IsString,
  Max,
  MinLength,
} from 'class-validator';
import { UserTable } from 'src/db/schemas';

export class CreaateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  password: string;

  @IsString()
  role: string;
}
