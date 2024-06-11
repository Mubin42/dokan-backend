import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateStoreAdminDto {
  @IsNotEmpty()
  @IsString()
  store: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
