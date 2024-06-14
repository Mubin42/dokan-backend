import { Controller, Get } from '@nestjs/common';

@Controller('admin-portal')
export class AdminPortalController {
  constructor() {}
  @Get()
  async hello() {
    return 'Hello from Admin Portal';
  }
}
