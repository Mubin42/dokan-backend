import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StoreConfig } from '../schemas/store-config.schema';
import mongoose, { Model } from 'mongoose';
import {
  CreateStoreConfigReqBody,
  UpdateStoreConfigReqBody,
} from '../dtos/store-config.dto';
import { OnEvent } from '@nestjs/event-emitter';
import { EVENTS } from 'src/common/event-emitter/event-name';
import { CreateStoreEventDto } from 'src/common/event-emitter/dtos/createStoreEventDto';
import { PaginationRequest } from 'src/common/middleware/pagination.middleware';

@Injectable()
export class StoreConfigService {
  constructor(
    @InjectModel(StoreConfig.name) private storeConfigModel: Model<StoreConfig>,
  ) {}

  async getAllWithPagination(req: PaginationRequest) {
    const { sort, limit, skip, search } = req.meta;

    // query for search
    const searchQuery = {
      $or: [
        { apiKey: { $regex: search, $options: 'i' } },
        { store: { $regex: search, $options: 'i' } },
      ],
    };

    const data = await this.storeConfigModel
      .find(searchQuery)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .exec();

    const count = await this.storeConfigModel.countDocuments(searchQuery);

    req.meta.docsInPage = data.length;
    req.meta.totalDocs = count;
    req.meta.totalPages = Math.ceil(count / limit);

    return {
      ...req.meta,
      doc: data,
    };
  }

  async createStoreConfig(storeConfig: CreateStoreConfigReqBody) {
    const createdStoreConfig = new this.storeConfigModel(storeConfig);
    return createdStoreConfig.save();
  }

  @OnEvent(EVENTS.storeCreated)
  async listenToStoreCreatedEvent(createStoreEventDto: CreateStoreEventDto) {
    const { store, storeId } = createStoreEventDto;
    const storeConfig = await this.storeConfigModel
      .findOne({ apiKey: store })
      .exec();

    if (!storeConfig) {
      throw new HttpException('Store not found', HttpStatus.NOT_FOUND);
    }

    storeConfig.store = storeId as unknown as mongoose.Schema.Types.ObjectId;

    return storeConfig.save();
  }

  // this method is used in the ValidateStoreMiddleware
  async findByApiKeyForStoreMiddleWare(apiKey: string) {
    return await this.storeConfigModel.findOne({ apiKey }).exec();
  }

  async update(id: string, storeConfig: UpdateStoreConfigReqBody) {
    const data = await this.storeConfigModel.findByIdAndUpdate(
      id,
      storeConfig,
      { new: true },
    );

    if (!data) {
      throw new HttpException('Store Config not found', HttpStatus.NOT_FOUND);
    }

    return data;
  }
}
