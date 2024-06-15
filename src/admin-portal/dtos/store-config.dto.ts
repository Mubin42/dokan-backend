import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStoreConfigReqBody {
  @IsOptional()
  @IsString()
  store: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsNotEmpty()
  @IsString()
  apiKey: string;
}
