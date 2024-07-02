import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperAdminAuthGuard } from 'src/auth/guards/super-admin-auth.guard';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { PaginationRequest } from 'src/common/middleware/pagination.middleware';
import { StoreService } from 'src/store/store.service';

@ApiTags('Stores')
@ApiBearerAuth()
@UseGuards(SuperAdminAuthGuard)
@Controller('admin-portal/stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @ApiResponse({
    status: 200,
    description: 'Get all stores',
  })
  @ApiQuery({
    type: PaginationQuery,
  })
  @Get()
  async getStores(@Req() req: PaginationRequest) {
    return this.storeService.getAllWithPagination(req);
  }

  @Get(':id')
  async getStoreById(@Param('id') req: string) {
    const doc = await this.storeService.getById(req);
    return {
      doc,
    };
  }
}
