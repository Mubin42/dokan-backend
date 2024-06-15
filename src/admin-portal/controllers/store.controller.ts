import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { SuperAdminAuthGuard } from 'src/auth/guards/super-admin-auth.guard';
import { PaginatedRequest } from 'src/common/middleware/pagination.middleware';

@UseGuards(SuperAdminAuthGuard)
@Controller('admin-portal/stores')
export class StoreController {
  constructor() {}

  // Pagination middleware is applied to this route
  @Get()
  async getStores(@Req() req: PaginatedRequest) {
    const { sort, page, limit, skip, search } = req.meta;
    return {
      message: 'Stores fetched successfully',
      sort: sort,
      page: page,
      limit: limit,
      skip: skip,
      search: search,
    };
  }
}
