import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { SuperAdminService } from './super-admin/super-admin.service';
import { StoreAdminService } from './store-admin/store-admin.service';
import { SuperAdminController } from './super-admin/super-admin.controller';
import { StoreAdminController } from './store-admin/store-admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SuperAdmin, SuperAdminSchema } from './schemas/super-admin.schema';
import { StoreAdmin, StoreAdminSchema } from './schemas/store-admin.schema';
import { SuperAdminAuthGuard } from './guards/super-admin-auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    MongooseModule.forFeature([
      {
        name: SuperAdmin.name,
        schema: SuperAdminSchema,
      },
      {
        name: StoreAdmin.name,
        schema: StoreAdminSchema,
      },
    ]),
  ],
  providers: [SuperAdminService, StoreAdminService, SuperAdminAuthGuard],
  controllers: [SuperAdminController, StoreAdminController],
  exports: [AuthModule, SuperAdminService],
})
export class AuthModule {}
