import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';
import { SuperAdminAuthGuard } from 'src/auth/guards/super-admin-auth.guard';
import { LoginDto } from '../dtos/login.dto';
import { CreateSuperAdminReqBody } from '../dtos/super-admin.dto';

@Controller('super-admin')
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) {}

  @Post()
  @UseGuards(SuperAdminAuthGuard)
  async createSuperAdmin(
    @Body() createSuperAdminReqBody: CreateSuperAdminReqBody,
  ) {
    return this.superAdminService.createSuperAdmin(createSuperAdminReqBody);
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
