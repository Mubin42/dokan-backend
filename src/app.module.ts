import { Module } from '@nestjs/common';

import { ConfigsModule } from './configs/configs.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URL), ConfigsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
