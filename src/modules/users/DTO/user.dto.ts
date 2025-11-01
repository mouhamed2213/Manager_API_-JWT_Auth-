import { IsEmail, isString, IsString, Max, MinLength } from 'class-validator';

export class CreaateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  password: string;

  @IsString()
  role: string;
}
