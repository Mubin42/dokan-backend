import { Module } from '@nestjs/common';
import { StoreService } from './services/store.service';
import { StoreController } from './controllers/store.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, StoreSchema } from './schemas/store.schema';
import { Brand, BrandSchema } from './schemas/brand.schema';
import { BrandService } from './services/brand.service';
import { BrandController } from './controllers/brand.controller';
import { Category, CategorySchema } from './schemas/category.schema';
import { CategoryService } from './services/category.service';
import { CategoryController } from './controllers/category.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Store.name,
        schema: StoreSchema,
      },
      {
        name: Brand.name,
        schema: BrandSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
  ],
  providers: [StoreService, BrandService, CategoryService],
  controllers: [StoreController, BrandController, CategoryController],
  exports: [StoreService],
})
export class StoreModule {}
