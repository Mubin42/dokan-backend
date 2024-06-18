import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SysConfigService } from '../providers/sys-config.service';
import {
  CreateSystemConfigReqBody,
  UpdateSystemConfigReqBody,
} from '../dtos/sys-config.dto';
import { SuperAdminAuthGuard } from 'src/auth/guards/super-admin-auth.guard';

@ApiTags('System Configuration') // Tag for grouping endpoints in Swagger UI
@UseGuards(SuperAdminAuthGuard)
@Controller('admin-portal/config')
export class SysConfigController {
  constructor(private readonly sysConfigService: SysConfigService) {}

  @Get()
  @ApiOperation({ summary: 'Get all system configurations' }) // Operation description
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: [CreateSystemConfigReqBody],
  }) // Expected response
  async getConfigs() {
    const data = await this.sysConfigService.getSystemConfig();
    return {
      doc: data,
    };
  }

  @Get(':key')
  @ApiOperation({ summary: 'Get system configuration by key' }) // Operation description
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: CreateSystemConfigReqBody,
  }) // Expected response for a single config
  async getConfigByKey(@Param('key') key: string) {
    const data = await this.sysConfigService.getByKey(key);
    return {
      doc: data,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new system configuration' }) // Operation description
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: CreateSystemConfigReqBody,
  }) // Expected response
  async createConfig(
    @Body() createSystemConfigReqBody: CreateSystemConfigReqBody,
  ) {
    const data = await this.sysConfigService.createSystemConfig(
      createSystemConfigReqBody,
    );
    return {
      doc: data,
    };
  }

  // Update
  @ApiOperation({ summary: 'Update a system configuration' }) // Operation description
  @ApiResponse({
    status: 200,
    description: 'Updated',
    type: CreateSystemConfigReqBody,
  }) // Expected response
  @Put()
  async updateConfig(
    @Body() updateSystemConfigReqBody: UpdateSystemConfigReqBody,
  ) {
    const data = await this.sysConfigService.update(updateSystemConfigReqBody);
    return {
      doc: data,
    };
  }
}
