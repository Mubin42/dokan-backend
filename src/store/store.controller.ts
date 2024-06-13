import { Controller, Get, Headers } from '@nestjs/common';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  getProducts(@Headers('store') store: string) {
    return this.storeService.getProducts(store);
  }
}

