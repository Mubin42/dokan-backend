import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateSuperAdminReqBody {
  @ApiProperty({ description: 'Name of the super admin' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Email of the super admin', uniqueItems: true })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password for the super admin account' })
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({ description: 'Role of the super admin' })
  @IsString()
  @IsOptional()
  role: string;

  @ApiPropertyOptional({ description: 'Whether the super admin is active' })
  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @ApiPropertyOptional({ description: 'Phone number of the super admin' })
  @IsPhoneNumber()
  @IsOptional()
  phone: string;
}

export class UpdateSuperAdminReqBody extends PartialType(
  OmitType(CreateSuperAdminReqBody, ['password', 'email'] as const),
) {}
