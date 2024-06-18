import { Body, Controller, Get, Headers, Post, Put, Req } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreReqBody, UpdateStoreReqBody } from './dtos/store.dto';
import { StoreRequest } from './middlewares/validate-store.middleware';

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

  @Get('self')
  async getSelf(@Req() req: StoreRequest) {
    const store = req.store;
    return this.storeService.getById(store);
  }

  @Put('update')
  async updateStore(
    @Req() req: StoreRequest,
    @Body() updateStoreReqBody: UpdateStoreReqBody,
  ) {
    const store = req.store;
    return this.storeService.update(store, updateStoreReqBody);
  }
}
