import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAuthDto {
  // email
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  // password
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  role: string;
}
