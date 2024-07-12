import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigsModule } from './configs/configs.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from './store/store.module';
import { ValidateStoreMiddleware } from './store/middlewares/validate-store.middleware';
import { AdminPortalModule } from './admin-portal/admin-portal.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PaginationMiddleware } from './common/middleware/pagination.middleware';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL),
    ConfigsModule,
    AuthModule,
    StoreModule,
    AdminPortalModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // validate store middleware is applied to this route
    consumer.apply(ValidateStoreMiddleware).forRoutes('store');

    // pagination middleware is applied to these routes
    consumer
      .apply(PaginationMiddleware)
      .forRoutes(
        { path: 'admin-portal/stores', method: RequestMethod.GET },
        { path: 'admin-portal/super-admins', method: RequestMethod.GET },
        { path: 'admin-portal/store-config', method: RequestMethod.GET },
        { path: 'store/brands', method: RequestMethod.GET },
      );
  }
}
