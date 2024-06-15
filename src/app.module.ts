import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigsModule } from './configs/configs.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from './store/store.module';
import { ValidateStoreMiddleware } from './store/middlewares/validate-store.middleware';
import { AdminPortalModule } from './admin-portal/admin-portal.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    // WATCH: https://www.youtube.com/watch?v=-MlXwb42nKo&t=589s
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
    consumer.apply(ValidateStoreMiddleware).forRoutes('store');
  }
}
