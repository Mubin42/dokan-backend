import { Controller, Post } from '@nestjs/common';
import { SuperAdminService } from 'src/auth/super-admin/super-admin.service';
import { CreateSuperAdminReqBody } from '../../auth/dtos/super-admin.dto';

@Controller('admin-portal')
export class AdminPortalController {
  constructor(private readonly superAdminService: SuperAdminService) {}

  @Post()
  async createSuperAdmin(createSuperAdminReqBody: CreateSuperAdminReqBody) {
    return this.superAdminService.createSuperAdmin(createSuperAdminReqBody);
  }
}
