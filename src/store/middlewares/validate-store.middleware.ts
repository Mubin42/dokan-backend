import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { NextFunction, Request, Response } from 'express';
import { StoreConfigService } from 'src/admin-portal/providers/store-config.service';

@Injectable()
export class ValidateStoreMiddleware implements NestMiddleware {
  private storeConfigService: StoreConfigService;

  constructor(private moduleRef: ModuleRef) {
    this.storeConfigService = this.moduleRef.get(StoreConfigService, {
      strict: false,
    });
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const store = req.headers.store;

    const storeConfig =
      await this.storeConfigService.findByApiKeyForStoreMiddleWare(
        store as string,
      );

    if (!storeConfig) {
      throw new HttpException('Invalid store 2', HttpStatus.UNAUTHORIZED);
    }

    if (!storeConfig.isActive) {
      throw new HttpException(
        'Store is not active, Please contact the admins',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!storeConfig) {
      throw new HttpException('Invalid store', HttpStatus.UNAUTHORIZED);
    }

    next();
  }
}
