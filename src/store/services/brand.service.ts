import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Brand } from '../schemas/brand.schema';
import { Model } from 'mongoose';
import { CreateBrandReqBody, UpdateBrandReqBody } from '../dtos/brand.dto';
import { PaginationRequest } from 'src/common/middleware/pagination.middleware';
import { MongooseValidator } from 'src/common/classes/MongooseValidator';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand.name) private readonly brandModel: Model<Brand>,
  ) {}

  // create a new brand
  async create(store: string, createStoreReqBody: CreateBrandReqBody) {
    return await this.brandModel.create({ store, ...createStoreReqBody });
  }

  // Get all brands
  async getAllWithPagination(store: string, req: PaginationRequest) {
    const { sort, limit, skip, search } = req.meta;

    const searchQuery = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ],
    };

    const data = await this.brandModel
      .find({ store, ...searchQuery })
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .exec();

    const count = await this.brandModel.countDocuments({
      store,
      ...searchQuery,
    });

    req.meta.docsInPage = data.length;
    req.meta.totalDocs = count;
    req.meta.totalPages = Math.ceil(count / limit);

    return {
      ...req.meta,
      doc: data,
    };
  }

  // Get a brand by id
  async getById(store: string, brandId: string) {
    MongooseValidator.validateId(brandId);

    const data = await this.brandModel.findOne({ store, _id: brandId }).exec();

    if (!data) {
      throw new NotFoundException('Brand not found');
    }

    return data;
  }

  // Update a brand
  async update(
    store: string,
    brandId: string,
    updateBrandReqBody: UpdateBrandReqBody,
  ) {
    MongooseValidator.validateId(brandId);
    const data = await this.brandModel.findOneAndUpdate(
      { store: store, _id: brandId },
      updateBrandReqBody,
      {
        new: true,
      },
    );

    if (!data) {
      throw new NotFoundException('Brand not found');
    }

    return data;
  }

  // Delete a brand
  async delete(store: string, brandId: string) {
    MongooseValidator.validateId(brandId);
    const data = await this.brandModel.findOneAndDelete({
      store: store,
      _id: brandId,
    });

    if (!data) {
      throw new NotFoundException('Brand not found');
    }

    return data;
  }
}
