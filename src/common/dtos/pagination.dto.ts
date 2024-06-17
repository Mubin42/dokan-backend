import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginationQuery {
  @IsString()
  @IsOptional()
  sort: string;

  @IsNumber()
  @IsOptional()
  page: number;

  @IsNumber()
  @IsOptional()
  limit: number;

  @IsString()
  @IsOptional()
  search: string;
}
