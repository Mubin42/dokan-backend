import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import {
  CreateSuperAdminReqBody,
  UpdateSuperAdminReqBody,
} from '../../auth/dtos/super-admin.dto';
import { SuperAdminService } from 'src/auth/providers/super-admin.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperAdminAuthGuard } from 'src/auth/guards/super-admin-auth.guard';

@ApiTags('Super Admins')
@Controller('admin-portal/super-admins')
@UseGuards(SuperAdminAuthGuard)
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) {}

  @ApiResponse({
    status: 200,
    description: 'Get all super admins',
  })
  @Get()
  async getAllSuperAdmins() {
    return this.superAdminService.getAllSuperAdmins();
  }

  @ApiResponse({
    status: 200,
    description: 'Get super admin by ID',
  })
  @ApiResponse({
    status: 404,
    description: 'Super admin not found',
  })
  @Get(':id')
  async getSuperAdminById(@Param('id') id: string) {
    return this.superAdminService.getByID(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Create a new super admin',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @Post()
  async createSuperAdmin(
    @Body() createSuperAdminReqBody: CreateSuperAdminReqBody,
  ) {
    return this.superAdminService.createSuperAdmin(createSuperAdminReqBody);
  }

  @ApiResponse({
    status: 200,
    description: 'Update a super admin',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 404,
    description: 'Super admin not found',
  })
  @Put(':id')
  async updateSuperAdmin(
    @Param('id') id: string,
    @Body() updateSuperAdminReqBody: UpdateSuperAdminReqBody,
  ) {
    return this.superAdminService.update(id, updateSuperAdminReqBody);
  }

  @ApiResponse({
    status: 200,
    description: 'Delete a super admin',
  })
  @ApiResponse({
    status: 404,
    description: 'Super admin not found',
  })
  @Delete(':id')
  async deleteSuperAdmin(@Param('id') id: string) {
    return this.superAdminService.delete(id);
  }
}
