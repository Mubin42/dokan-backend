import { Module } from '@nestjs/common';
import { ConfigsModule } from './configs/configs.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SuperAdminModule } from './super-admin/super-admin.module';
import { AuthModule } from './auth/auth.module';
import { StoreAdminModule } from './store-admin/store-admin.module';
import { AcsModule } from './acs/acs.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URL), ConfigsModule, SuperAdminModule, AuthModule, StoreAdminModule, AcsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
