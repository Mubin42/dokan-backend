import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationQuery {
  @ApiPropertyOptional({ description: 'Sort order', example: '-createdAt' })
  @IsString()
  @IsOptional()
  sort: string;

  @ApiPropertyOptional({ description: 'Page number', example: 1 })
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiPropertyOptional({ description: 'Limit of items per page', example: 10 })
  @IsNumber()
  @IsOptional()
  limit: number;

  @ApiPropertyOptional({ description: 'Search query', example: 'book' })
  @IsString()
  @IsOptional()
  search: string;
}
