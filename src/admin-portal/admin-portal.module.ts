import { Module } from '@nestjs/common';

import { AdminPortalController } from './admin-portal.controller';
import { SysConfigController } from './controllers/sys-config.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [AdminPortalController, SysConfigController],
})
export class AdminPortalModule {}
