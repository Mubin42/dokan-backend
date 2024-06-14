import { Controller, Get } from '@nestjs/common';

@Controller('admin-portal/config')
export class SysConfigController {
  constructor() {}

  @Get()
  async hello() {
    return 'Hello from Sys Config';
  }
}
