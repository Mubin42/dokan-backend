import { Controller, Post } from '@nestjs/common';

import { CreateSuperAdminReqBody } from '../../auth/dtos/super-admin.dto';
import { SuperAdminService } from 'src/auth/providers/super-admin.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admin Portal')
@Controller('admin-portal')
export class AdminPortalController {
  constructor(private readonly superAdminService: SuperAdminService) {}

  @Post()
  async createSuperAdmin(createSuperAdminReqBody: CreateSuperAdminReqBody) {
    return this.superAdminService.createSuperAdmin(createSuperAdminReqBody);
  }
}
