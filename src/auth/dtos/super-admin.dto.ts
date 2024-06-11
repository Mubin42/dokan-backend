import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSuperAdminDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
