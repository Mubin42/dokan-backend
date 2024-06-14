import { Module } from '@nestjs/common';
import { AdminPortalController } from './admin-portal.controller';
import { SysConfigController } from './controllers/sys-config.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [],
  controllers: [AdminPortalController, SysConfigController],
})
export class AdminPortalModule {}
