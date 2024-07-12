import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { BrandService } from '../services/brand.service';
import { StoreRequest } from '../middlewares/validate-store.middleware';
import { CreateBrandReqBody } from '../dtos/brand.dto';
import { PaginationRequest } from 'src/common/middleware/pagination.middleware';

@Controller('store/brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  async createBrand(
    @Req() req: StoreRequest,
    @Body() createBrandReqBody: CreateBrandReqBody,
  ) {
    const doc = await this.brandService.create(req.store, createBrandReqBody);

    return {
      doc,
    };
  }

  @Get()
  async getBrands(@Req() req: StoreRequest & PaginationRequest) {
    return this.brandService.getAllWithPagination(req.store, req);
  }
}
