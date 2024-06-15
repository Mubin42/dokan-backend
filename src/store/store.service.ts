import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Store } from './schemas/store.schema';
import { Model } from 'mongoose';
import { CreateStoreReqBody } from './dtos/store.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EVENTS } from 'src/common/event-emitter/event-name';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name) private readonly storeModel: Model<Store>,
    private eventEmitter: EventEmitter2,
  ) {}

  async createStore(store: string, createStoreReqBody: CreateStoreReqBody) {
    // TODO: Event emitter to create store
    const newStore = await this.storeModel.create(createStoreReqBody);

    const eventData = {
      store,
      storeId: newStore._id,
    };

    this.eventEmitter.emitAsync(EVENTS.storeCreated, eventData);

    return await this.storeModel.create(createStoreReqBody);
  }
  getProducts(store: string) {
    return `Products for ${store}`;
  }
}
