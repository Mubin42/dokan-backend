import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigsModule } from './configs/configs.module';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { StoreModule } from './store/store.module';
import { ValidateStoreMiddleware } from './common/middlewares/validate-store.middleware';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    ConfigsModule,
    AuthModule,
    StoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateStoreMiddleware).forRoutes('store');
  }
}
