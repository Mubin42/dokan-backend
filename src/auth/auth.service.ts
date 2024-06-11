import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { SuperAdminService } from 'src/auth/super-admin/super-admin.service';

@Injectable()
export class AuthService {
  constructor() {}
}
