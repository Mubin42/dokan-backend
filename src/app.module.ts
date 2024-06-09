import { Module } from '@nestjs/common';

import { ConfigsModule } from './configs/configs.module';

@Module({
  imports: [ConfigsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
