import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';
import { CreateSuperAdminDto } from '../dtos/super-admin.dto';
import { SuperAdminAuthGuard } from 'src/auth/guards/super-admin-auth.guard';
import { LoginDto } from '../dtos/login.dto';

@Controller('super-admin')
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) {}

  @Post()
  @UseGuards(SuperAdminAuthGuard)
  async createSuperAdmin(@Body() createSuperAdminDto: CreateSuperAdminDto) {
    return this.superAdminService.createSuperAdmin(createSuperAdminDto);
  }

  @Get()
  @UseGuards(SuperAdminAuthGuard)
  async getSuperAdmins() {
    return this.superAdminService.getAllSuperAdmins();
  }

  @Post('login')
  async loginSuperAdmin(@Body() loginDto: LoginDto) {
    return this.superAdminService.superAdminLogin(loginDto);
  }
}
