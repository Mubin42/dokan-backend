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
import { CategoryService } from '../services/category.service';
import { StoreRequest } from '../middlewares/validate-store.middleware';
import {
  CreateCategoryReqBody,
  UpdateCategoryReqBody,
} from '../dtos/category.schema';
import { PaginationRequest } from 'src/common/middleware/pagination.middleware';

/**
 * Controller for category CRUD operation
 */
@Controller('store/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // Create a category
  @Post()
  async createCategory(
    @Req() req: StoreRequest,
    @Body() createCategoryReqBody: CreateCategoryReqBody,
  ) {
    const doc = await this.categoryService.create(
      req.store,
      createCategoryReqBody,
    );

    return {
      message: 'Category created successfully',
      doc,
    };
  }

  // Get all category with pagination
  async getCategories(@Req() req: StoreRequest & PaginationRequest) {
    return this.categoryService.getAllWithPagination(req.store, req);
  }

  @Get('id')
  async getCategory(@Req() req: StoreRequest, @Param('id') id: string) {
    const doc = await this.categoryService.getById(req.store, id);

    return {
      doc,
    };
  }

  @Put('id')
  async updateCategory(
    @Req() req: StoreRequest,
    @Param('id') id: string,
    @Body() updateCategoryReqBody: UpdateCategoryReqBody,
  ) {
    const doc = await this.categoryService.update(
      req.store,
      id,
      updateCategoryReqBody,
    );

    return {
      message: 'Category Updated Successfully',
      doc,
    };
  }

  @Delete('id')
  async deleteCategory(@Req() req: StoreRequest, @Param('id') id: string) {
    const doc = await this.categoryService.delete(req.store, id);

    return {
      message: 'Category Deleted Successfully',
      doc,
    };
  }
}
