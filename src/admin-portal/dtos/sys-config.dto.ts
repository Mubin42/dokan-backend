import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger'; // Import ApiProperty
import { ConfigValueType } from '../schemas/sys-config.schema';

export class CreateSystemConfigReqBody {
  @ApiProperty({
    description: 'Unique key for the configuration item',
    example: 'Site Title',
  })
  @IsNotEmpty()
  @IsString()
  key: string;

  @ApiProperty({
    description: 'Value of the configuration item',
    example: 'My Awesome Site',
  })
  @IsNotEmpty()
  value: any;

  @ApiProperty({
    description: 'Type of the configuration value',
    example: ConfigValueType.string,
    enum: ConfigValueType,
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(ConfigValueType)
  type: ConfigValueType;
}

export class UpdateSystemConfigReqBody extends PartialType(
  CreateSystemConfigReqBody,
) {}
