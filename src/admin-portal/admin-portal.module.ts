import { Module } from '@nestjs/common';
import { AdminPortalController } from './admin-portal.controller';
import { SysConfigController } from './controllers/sys-config.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { SysConfigService } from './providers/sys-config.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemConfig, SystemConfigSchema } from './schemas/sys-config.schema';
import { StoreConfig, StoreConfigSchema } from './schemas/store-config.schema';
import { StoreConfigService } from './providers/store-config.service';
import { StoreConfigController } from './controllers/store-config.controller';

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
    AdminPortalController,
    SysConfigController,
    StoreConfigController,
  ],
})
export class AdminPortalModule {}
