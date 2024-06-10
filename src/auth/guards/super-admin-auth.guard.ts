import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { SuperAdminService } from 'src/super-admin/super-admin.service';

@Injectable()
export class SuperAdminAuthGuard implements CanActivate {
  constructor(
    private readonly superAdminService: SuperAdminService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    return this.validateRequest(request);
  }

  private validateRequest(request: Request): boolean {
    const token = request.headers.authorization;

    return token === 'super-admin-token';
  }
}
