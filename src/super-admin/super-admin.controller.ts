import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';
import { CreateSuperAdminDto } from './dtos/super-admin.dto';
import { LoginDto } from './dtos/login.dto';
import { SuperAdminAuthGuard } from 'src/auth/guards/super-admin-auth.guard';

@Controller('super-admin')
@UseGuards(SuperAdminAuthGuard)
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) {}

  @Post()
  async createSuperAdmin(@Body() createSuperAdminDto: CreateSuperAdminDto) {
    return this.superAdminService.createSuperAdmin(createSuperAdminDto);
  }

  @Get()
  async getSuperAdmins() {
    return this.superAdminService.getAllSuperAdmins();
  }

  @Post('login')
  async loginSuperAdmin(@Body() loginDto: LoginDto) {
    return this.superAdminService.loginSuperAdmin(loginDto);
  }
}
