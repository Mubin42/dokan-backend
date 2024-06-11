import { Module } from '@nestjs/common';
import { ConfigsModule } from './configs/configs.module';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    ConfigsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
