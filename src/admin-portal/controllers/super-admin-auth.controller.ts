import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { LoginDto } from 'src/auth/dtos/login.dto';
import { SuperAdminService } from 'src/auth/providers/super-admin.service';

@Controller('admin-portal/auth')
export class SuperAdminAuthController {
  constructor(private readonly superAdminService: SuperAdminService) {}

  @Post('login')
  async loginSuperAdmin(@Body() loginDto: LoginDto) {
    return this.superAdminService.superAdminLogin(loginDto);
  }
  @Get('self')
  async getSelf(@Headers('Authorization') token: string) {
    return this.superAdminService.getSelf(token);
  }
}
