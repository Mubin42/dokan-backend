import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { BrandService } from '../services/brand.service';
import { StoreRequest } from '../middlewares/validate-store.middleware';
import { CreateBrandReqBody, UpdateBrandReqBody } from '../dtos/brand.dto';
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
      message: 'Brand created successfully',
      doc,
    };
  }

  @Get()
  async getBrands(@Req() req: StoreRequest & PaginationRequest) {
    return this.brandService.getAllWithPagination(req.store, req);
  }

  @Get(':id')
  async getBrand(@Req() req: StoreRequest, @Param('id') id: string) {
    const doc = await this.brandService.getById(req.store, id);

    return {
      doc,
    };
  }

  @Put(':id')
  async updateBrand(
    @Req() req: StoreRequest,
    @Param('id') id: string,
    @Body() updateBrandReqBody: UpdateBrandReqBody,
  ) {
    const doc = await this.brandService.update(
      req.store,
      id,
      updateBrandReqBody,
    );

    return {
      message: 'Brand updated successfully',
      doc,
    };
  }

  @Delete(':id')
  async deleteBrand(@Req() req: StoreRequest, @Param('id') id: string) {
    await this.brandService.delete(req.store, id);

    return {
      message: 'Brand deleted successfully',
    };
  }
}
