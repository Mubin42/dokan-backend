import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// TODO: change dto name from LoginDto to LoginRequest
export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
