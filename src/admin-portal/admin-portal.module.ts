import { Module } from '@nestjs/common';
import { AdminPortalService } from './admin-portal.service';
import { AdminPortalController } from './admin-portal.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [AdminPortalService],
  controllers: [AdminPortalController],
})
export class AdminPortalModule {}
