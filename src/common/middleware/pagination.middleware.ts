import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export type PaginationRequest = Request & {
  meta: {
    search: string;
    sort: string;
    page: number;
    limit: number;
    skip: number;
    docsInPage?: number;
    totalDocs?: number;
    totalPages?: number;
  };
};

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
  use(req: PaginationRequest, res: Response, next: NextFunction) {
    // get sort, page, limit, search from query params
    const sort: string = req.query.sort
      ? req.query.sort.toString()
      : '-createdAt';
    const page: number = req.query.page ? Number(req.query.page) : 1;

    const limit: number = req.query.limit ? Number(req.query.limit) : 10;

    const search: string = req.query.search ? req.query.search.toString() : '';

    if (page < 1) {
      throw new HttpException(
        'Page number should be greater than 0',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (limit < 1) {
      throw new HttpException(
        'Limit should be greater than 0',
        HttpStatus.BAD_REQUEST,
      );
    }

    // set the values in req meta object
    req.meta = {
      search,
      sort,
      page,
      limit,
      skip: (page - 1) * limit,
    };

    // pass the request to the next middleware
    return next();
  }
}
