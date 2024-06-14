import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateSuperAdminReqBody {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  role: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsPhoneNumber()
  @IsOptional()
  phone: string;
}
