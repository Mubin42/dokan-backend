import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ContactDto {
  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  website?: string;
}

class KeyValuePairDto {
  @IsString()
  key: string;

  @IsString()
  value: string;
}

class MetaDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  keywords: string[];
}

export class CreateStoreReqBody {
  @IsString()
  name: string;

  @IsString()
  storeType: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  searchTags?: string[];

  // TODO: Update this to use AddressDto once the address schema is defined
  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ContactDto)
  contact?: ContactDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KeyValuePairDto)
  socials?: KeyValuePairDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => MetaDto)
  meta?: MetaDto;
}
