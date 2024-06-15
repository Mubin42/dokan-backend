import { Body, Controller, Get, Post } from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';

import { LoginDto } from '../dtos/login.dto';

@Controller('super-admin')
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) {}

  @Post('login')
  async loginSuperAdmin(@Body() loginDto: LoginDto) {
    return this.superAdminService.superAdminLogin(loginDto);
  }
  @Get('self')
  async getSelf() {
    return 'get self super admin';
  }
}
