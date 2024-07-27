import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../schemas/category.schema';
import { Model } from 'mongoose';
import {
  CreateCategoryReqBody,
  UpdateCategoryReqBody,
} from '../dtos/category.schema';
import { PaginationRequest } from 'src/common/middleware/pagination.middleware';
import { MongooseValidator } from 'src/common/classes/MongooseValidator';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  // create a new category
  async create(store: string, createCategoryReqBody: CreateCategoryReqBody) {
    return await this.categoryModel.create({ store, ...createCategoryReqBody });
  }

  // Get categories with pagination
  async getAllWithPagination(store: string, req: PaginationRequest) {
    const { sort, limit, skip, search } = req.meta;

    const searchQuery = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ],
    };

    const data = await this.categoryModel
      .find({ store, ...searchQuery })
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .exec();

    const count = await this.categoryModel.countDocuments({
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

  // Get category by ID
  async getById(store: string, categoryId: string) {
    MongooseValidator.validateId(categoryId);

    const data = await this.categoryModel.findOne({ store, _id: categoryId });

    if (!data) {
      throw new NotFoundException('Category Not Found');
    }

    return data;
  }

  // Update a Category
  async update(
    store: string,
    categoryId: string,
    updateCategoryReqBody: UpdateCategoryReqBody,
  ) {
    MongooseValidator.validateId(categoryId);

    const data = await this.categoryModel.findOneAndUpdate(
      { store, _id: categoryId },
      updateCategoryReqBody,
      { new: true },
    );

    if (!data) {
      throw new NotFoundException('Category Not Found');
    }

    return data;
  }

  // Delete a category
  async delete(store: string, categoryId: string) {
    MongooseValidator.validateId(categoryId);

    const data = await this.categoryModel.findOneAndDelete({
      store,
      _id: categoryId,
    });

    if (!data) {
      throw new NotFoundException('Category Not Found');
    }

    return data;
  }
}
