import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SystemConfig } from '../schemas/sys-config.schema';
import { Model } from 'mongoose';
import {
  CreateSystemConfigReqBody,
  UpdateSystemConfigReqBody,
} from '../dtos/sys-config.dto';

@Injectable()
export class SysConfigService {
  constructor(
    @InjectModel(SystemConfig.name) private sysConfigModel: Model<SystemConfig>,
  ) {}

  async getSystemConfig() {
    return this.sysConfigModel.find().exec();
  }

  async createSystemConfig(
    createSystemConfigReqBody: CreateSystemConfigReqBody,
  ) {
    const { key } = createSystemConfigReqBody;

    const ifExists = await this.sysConfigModel.findOne({ key });

    if (ifExists) {
      throw new HttpException(
        'System config already exists with this key',
        HttpStatus.BAD_REQUEST,
      );
    }

    const data = new this.sysConfigModel(createSystemConfigReqBody);

    return data.save();
  }

  async getByKey(key: string) {
    const data = await this.sysConfigModel.findOne({ key });

    if (!data) {
      throw new HttpException(
        'System config not found with this key',
        HttpStatus.NOT_FOUND,
      );
    }

    return data;
  }

  async update(UpdateSystemConfigReqBody: UpdateSystemConfigReqBody) {
    const { key } = UpdateSystemConfigReqBody;

    const data = await this.sysConfigModel.findOneAndUpdate(
      { key },
      UpdateSystemConfigReqBody,
      { new: true },
    );

    if (!data) {
      throw new HttpException(
        'System config not found with this key',
        HttpStatus.NOT_FOUND,
      );
    }

    return data;
  }
}
