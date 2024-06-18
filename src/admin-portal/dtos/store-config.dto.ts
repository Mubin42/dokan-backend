import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStoreConfigReqBody {
  @ApiProperty({
    type: String,
    description: 'Store identifier',
    required: false,
  })
  @IsOptional()
  @IsString()
  store: string;

  @ApiProperty({
    type: Boolean,
    description: 'Is active flag',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @ApiProperty({
    type: String,
    description: 'API key for the store',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  apiKey: string;
}

export class UpdateStoreConfigReqBody extends PartialType(
  CreateStoreConfigReqBody,
) {}
