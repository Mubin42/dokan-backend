import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreReqBody } from './dtos/store.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post('create')
  createStore(
    @Headers('store') store: string,
    @Body() createStoreReqBodyWithApiKey: CreateStoreReqBody,
  ) {
    return this.storeService.createStore(store, createStoreReqBodyWithApiKey);
  }

  @Get('products')
  getProducts(@Headers('store') store: string) {
    return this.storeService.getProducts(store);
  }
}
