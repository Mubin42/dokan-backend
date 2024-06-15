import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateStoreMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const store = req.headers.store;

    if (!store) {
      throw new HttpException('Invalid store', HttpStatus.UNAUTHORIZED);
    }

    const dummyStore = ['1SKAJHF23', '2ASDASD23'];

    const isValid = dummyStore.includes(store as string);

    if (!isValid) {
      throw new HttpException('Invalid store', HttpStatus.UNAUTHORIZED);
    }

    next();
  }
}
