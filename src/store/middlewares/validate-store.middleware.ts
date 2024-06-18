import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { NextFunction, Request } from 'express';
import { StoreConfigService } from 'src/admin-portal/providers/store-config.service';

export type StoreRequest = Request & {
  store: string;
};

@Injectable()
export class ValidateStoreMiddleware implements NestMiddleware {
  private storeConfigService: StoreConfigService;

  constructor(private moduleRef: ModuleRef) {
    this.storeConfigService = this.moduleRef.get(StoreConfigService, {
      strict: false,
    });
  }

  async use(req: StoreRequest, res: Response, next: NextFunction) {
    const store = req.headers.store;
    // find store by apiKey
    const storeConfig =
      await this.storeConfigService.findByApiKeyForStoreMiddleWare(
        store as string,
      );

    // if store is not found, throw an error
    if (!storeConfig) {
      throw new HttpException('Invalid store', HttpStatus.UNAUTHORIZED);
    }

    // if store is not active, throw an error
    if (!storeConfig.isActive) {
      throw new HttpException(
        'Store is not active, Please contact the admins',
        HttpStatus.UNAUTHORIZED,
      );
    }
    // set store id to request object
    req.store = storeConfig.store as unknown as string;

    // pass the request to the next middleware
    next();
  }
}
