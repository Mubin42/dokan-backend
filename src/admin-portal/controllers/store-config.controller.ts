import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { StoreConfigService } from '../providers/store-config.service';
import {
  CreateStoreConfigReqBody,
  UpdateStoreConfigReqBody,
} from '../dtos/store-config.dto';
import { SuperAdminAuthGuard } from 'src/auth/guards/super-admin-auth.guard';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { PaginationRequest } from 'src/common/middleware/pagination.middleware';

@ApiTags('Store Config')
@UseGuards(SuperAdminAuthGuard)
@Controller('admin-portal/store-config')
export class StoreConfigController {
  constructor(private readonly storeConfig: StoreConfigService) {}

  @Post()
  async createConfig(@Body() storeConfig: CreateStoreConfigReqBody) {
    const data = await this.storeConfig.createStoreConfig(storeConfig);

    return {
      message: 'Store config created successfully',
      doc: data,
    };
  }

  @ApiResponse({
    status: 200,
    description: 'Get all stores',
  })
  @ApiQuery({
    type: PaginationQuery,
  })
  @Get()
  async getAllConfigs(@Req() req: PaginationRequest) {
    return this.storeConfig.getAllWithPagination(req);
  }

  @Put('id')
  async updateConfig(
    @Param('id') id: string,
    @Body() updateStoreConfigReqBody: UpdateStoreConfigReqBody,
  ) {
    const data = await this.storeConfig.update(id, updateStoreConfigReqBody);

    return {
      message: 'Store config updated successfully',
      doc: data,
    };
  }
}
