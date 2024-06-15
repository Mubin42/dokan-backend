import { Body, Controller, Headers, Post } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreReqBody } from './dtos/store.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post('create')
  getProducts(
    @Headers('store') store: string,
    @Body() createStoreReqBody: CreateStoreReqBody,
  ) {
    return this.storeService.createStore(store, createStoreReqBody);
  }
}
