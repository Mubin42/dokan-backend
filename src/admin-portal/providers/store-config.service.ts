import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StoreConfig } from '../schemas/store-config.schema';
import mongoose, { Model } from 'mongoose';
import { CreateStoreConfigReqBody } from '../dtos/store-config.dto';
import { OnEvent } from '@nestjs/event-emitter';
import { EVENTS } from 'src/common/event-emitter/event-name';
import { CreateStoreEventDto } from 'src/common/event-emitter/dtos/createStoreEventDto';

@Injectable()
export class StoreConfigService {
  constructor(
    @InjectModel(StoreConfig.name) private storeConfigModel: Model<StoreConfig>,
  ) {}

  async getStoreConfig() {
    return this.storeConfigModel.find().exec();
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
}
