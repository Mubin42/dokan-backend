import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Store } from './schemas/store.schema';
import { Model } from 'mongoose';
import { CreateStoreReqBody, UpdateStoreReqBody } from './dtos/store.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EVENTS } from 'src/common/event-emitter/event-name';
import { PaginationRequest } from 'src/common/middleware/pagination.middleware';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name) private readonly storeModel: Model<Store>,
    private eventEmitter: EventEmitter2,
  ) {}

  async getAllWithPagination(req: PaginationRequest) {
    const { sort, limit, skip, search } = req.meta;

    // query for search
    const searchQuery = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { storeType: { $regex: search, $options: 'i' } },
        { 'contact.phone': { $regex: search, $options: 'i' } },
        { 'contact.email': { $regex: search, $options: 'i' } },
      ],
    };

    const data = await this.storeModel
      .find(searchQuery)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .exec();

    const count = await this.storeModel.countDocuments(searchQuery);

    req.meta.docsInPage = data.length;
    req.meta.totalDocs = count;
    req.meta.totalPages = Math.ceil(count / limit);

    return {
      ...req.meta,
      doc: data,
    };
  }

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

  async getById(id: string) {
    const data = await this.storeModel.findOne({ _id: id }).exec();

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
