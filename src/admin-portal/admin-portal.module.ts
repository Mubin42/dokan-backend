import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { AdminPortalController } from './admin-portal.controller';
import { SysConfigController } from './controllers/sys-config.controller';

@Module({
  imports: [AuthModule],
  providers: [],
  controllers: [AdminPortalController, SysConfigController],
})
export class AdminPortalModule {}
