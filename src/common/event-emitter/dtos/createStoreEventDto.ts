import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateStoreEventDto {
  @IsNotEmpty()
  @IsString()
  store: string;

  @IsMongoId()
  @IsNotEmpty()
  storeId: string;
}
