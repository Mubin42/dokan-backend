import { Body, Controller, Get, Post } from '@nestjs/common';
import { SysConfigService } from '../providers/sys-config.service';
import { CreateSystemConfigReqBody } from '../dtos/sys-config.dto';

@Controller('admin-portal/config')
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
