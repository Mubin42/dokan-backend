import { Injectable } from '@nestjs/common';

@Injectable()
export class StoreService {
  constructor() {}

  getProducts(store: string) {
    return `Products for ${store}`;
  }
}
