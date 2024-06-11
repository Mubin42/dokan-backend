import { Module } from '@nestjs/common';
import { StoreAdminService } from './store-admin.service';
import { StoreAdminController } from './store-admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreAdmin, StoreAdminSchema } from './schemas/store-admin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StoreAdmin.name, schema: StoreAdminSchema },
    ]),
  ],
  providers: [StoreAdminService],
  controllers: [StoreAdminController],
})
export class StoreAdminModule {}
