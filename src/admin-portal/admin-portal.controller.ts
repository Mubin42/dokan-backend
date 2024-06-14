import { Controller, Get, UseGuards } from '@nestjs/common';
import { SuperAdminAuthGuard } from 'src/auth/guards/super-admin-auth.guard';


@Controller('admin-portal')
@UseGuards(SuperAdminAuthGuard)
export class AdminPortalController {
  constructor() {}
  @Get()
  async hello() {
    return 'Hello from Admin Portal';
  }
}
