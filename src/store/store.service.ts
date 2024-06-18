import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Store } from './schemas/store.schema';
import { Model } from 'mongoose';
import { CreateStoreReqBody, UpdateStoreReqBody } from './dtos/store.dto';
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

  async getAll() {
    const data = await this.storeModel.find().exec();

    return data;
  }

  async getById(store: string) {
    const data = await this.storeModel
      .findOne({
        _id: store,
      })
      .exec();

    if (!data) {
      throw new HttpException('Store not found', HttpStatus.NOT_FOUND);
    }
    return data;
  }

  async update(store: string, updateStoreReqBody: UpdateStoreReqBody) {
    const updatedStore = await this.storeModel
      .findOneAndUpdate({ _id: store }, updateStoreReqBody, { new: true })
      .exec();

    if (!updatedStore) {
      throw new HttpException('Store not found', HttpStatus.NOT_FOUND);
    }

    return updatedStore;
  }
}
