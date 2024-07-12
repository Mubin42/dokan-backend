import { Module } from '@nestjs/common';
import { StoreService } from './services/store.service';
import { StoreController } from './controllers/store.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, StoreSchema } from './schemas/store.schema';
import { Brand, BrandSchema } from './schemas/brand.schema';
import { BrandService } from './services/brand.service';
import { BrandController } from './controllers/brand.controller';

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
    ]),
  ],
  providers: [StoreService, BrandService],
  controllers: [StoreController, BrandController],
  exports: [StoreService],
})
export class StoreModule {}
