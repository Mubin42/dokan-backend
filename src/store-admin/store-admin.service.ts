import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StoreAdmin } from './schemas/store-admin.schema';
import { Model } from 'mongoose';
import { CreateStoreAdminDto } from './dtos/create-store-admin.dto';

@Injectable()
export class StoreAdminService {
  constructor(
    @InjectModel(StoreAdmin.name) private storeAdminModel: Model<StoreAdmin>,
  ) {}

  async getStoreAdmins(): Promise<StoreAdmin[]> {
    return this.storeAdminModel.find().exec();
  }

  async createStoreAdmin(createStoreAdmin: CreateStoreAdminDto) {
    const storeAdmin = new this.storeAdminModel(createStoreAdmin);
    return storeAdmin.save();
  }
}
