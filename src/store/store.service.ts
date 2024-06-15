import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Store } from './schemas/store.schema';
import { Model } from 'mongoose';
import { CreateStoreReqBody } from './dtos/store.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name) private readonly storeModel: Model<Store>,
  ) {}

  async createStore(store: string, createStoreReqBody: CreateStoreReqBody) {
    return await this.storeModel.create(createStoreReqBody);
  }
  getProducts(store: string) {
    return `Products for ${store}`;
  }
}
