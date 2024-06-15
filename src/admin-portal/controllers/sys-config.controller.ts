import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SysConfigService } from '../providers/sys-config.service';
import { CreateSystemConfigReqBody } from '../dtos/sys-config.dto';
import { SuperAdminAuthGuard } from 'src/auth/guards/super-admin-auth.guard';

@Controller('admin-portal/config')
@UseGuards(SuperAdminAuthGuard)
export class SysConfigController {
  constructor(private readonly sysConfigService: SysConfigService) {}

  @Get()
  async getConfigs() {
    return this.sysConfigService.getSystemConfig();
  }

  @Post()
  async createConfig(
    @Body() createSystemConfigReqBody: CreateSystemConfigReqBody,
  ) {
    return this.sysConfigService.createSystemConfig(createSystemConfigReqBody);
  }
}
