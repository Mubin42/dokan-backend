import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ConfigValueType } from '../schemas/sys-config.schema';

export class CreateSystemConfigReqBody {
  @IsNotEmpty()
  @IsString()
  key: string;

  @IsNotEmpty()
  value: any;

  @IsNotEmpty()
  @IsString()
  @IsEnum(ConfigValueType)
  type: ConfigValueType;
}
