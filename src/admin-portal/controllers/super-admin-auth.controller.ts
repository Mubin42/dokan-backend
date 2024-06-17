import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginReqBody } from 'src/auth/dtos/login.dto';

import { SuperAdminService } from 'src/auth/providers/super-admin.service';

@ApiTags('Super Admin Auth')
@Controller('admin-portal/auth')
export class SuperAdminAuthController {
  constructor(private readonly superAdminService: SuperAdminService) {}

  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'Super admin login',
  })
  async loginSuperAdmin(@Body() loginDto: LoginReqBody) {
    return this.superAdminService.superAdminLogin(loginDto);
  }

  @Get('self')
  async getSelf(@Headers('Authorization') token: string) {
    // remove password from response
    const superAdmin = await this.superAdminService.getSelf(token);
    delete superAdmin.password;

    return {
      doc: superAdmin,
    };
  }
}
