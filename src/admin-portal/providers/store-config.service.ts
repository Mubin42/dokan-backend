import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StoreConfig } from '../schemas/store-config.schema';
import { Model } from 'mongoose';

@Injectable()
export class StoreConfigService {
  constructor(
    @InjectModel(StoreConfig.name) private storeConfigModel: Model<StoreConfig>,
  ) {}

  async getStoreConfig() {
    return this.storeConfigModel.find().exec();
  }
}
