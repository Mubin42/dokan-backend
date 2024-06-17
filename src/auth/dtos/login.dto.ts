import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// TODO: change dto name from LoginDto to LoginRequest
export class LoginReqBody {
  @ApiProperty({
    example: 'admin@gmail.com',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'admin123',
    required: true,
  })
  @IsNotEmpty()
  password: string;
}
