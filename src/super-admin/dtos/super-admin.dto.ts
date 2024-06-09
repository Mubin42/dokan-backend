import { IsEmail, IsString } from 'class-validator';

export class CreateSuperAdminDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
