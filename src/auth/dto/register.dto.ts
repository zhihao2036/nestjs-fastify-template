import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterDTO {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsOptional()
  phone_prefix: string;

  @ApiProperty()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email: string;
}
