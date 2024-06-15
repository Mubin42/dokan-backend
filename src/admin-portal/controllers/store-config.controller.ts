import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { StoreConfigService } from '../providers/store-config.service';
import { CreateStoreConfigReqBody } from '../dtos/store-config.dto';
import { SuperAdminAuthGuard } from 'src/auth/guards/super-admin-auth.guard';

@UseGuards(SuperAdminAuthGuard)
@Controller('admin-portal/store-config')
export class StoreConfigController {
  constructor(private readonly storeConfig: StoreConfigService) {}

  @Post()
  async createConfig(@Body() storeConfig: CreateStoreConfigReqBody) {
    return this.storeConfig.createStoreConfig(storeConfig);
  }
  @Get()
  async getConfigs() {
    return this.storeConfig.getStoreConfig();
  }
}
