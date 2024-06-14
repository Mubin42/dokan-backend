import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { SuperAdminService } from '../../auth/super-admin/super-admin.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SuperAdminAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly superAdminService: SuperAdminService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    return this.validateRequest(request);
  }

  private validateRequest(request: Request): boolean {
    const authorization = request.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return false;
    }

    const token = authorization.split(' ')[1];

    const decoded = this.jwtService.decode(token);

    if (!decoded) {
      return false;
    }

    const admin = this.superAdminService.findByQuery({
      _id: decoded._id,
      isActive: true,
    });

    return !!admin;
  }
}
