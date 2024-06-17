import { Module } from '@nestjs/common';

import { SysConfigController } from './controllers/sys-config.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { SysConfigService } from './providers/sys-config.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemConfig, SystemConfigSchema } from './schemas/sys-config.schema';
import { StoreConfig, StoreConfigSchema } from './schemas/store-config.schema';
import { StoreConfigService } from './providers/store-config.service';
import { StoreConfigController } from './controllers/store-config.controller';
import { StoreController } from './controllers/store.controller';
import { SuperAdminAuthController } from './controllers/super-admin-auth.controller';
import { SuperAdminController } from './controllers/super-admin.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SystemConfig.name, schema: SystemConfigSchema },
      { name: StoreConfig.name, schema: StoreConfigSchema },
    ]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    AuthModule,
  ],
  providers: [SysConfigService, StoreConfigService],
  controllers: [
    SysConfigController,
    StoreConfigController,
    StoreController,
    SuperAdminAuthController,
    SuperAdminController,
  ],
})
export class AdminPortalModule {}
