import { Controller, Get } from '@nestjs/common';
import { Roles } from './core/decorators/roles.decorator';

@Controller()
export class AppController {
  // Public route, no Roles decorator
  @Get('ping')
  ping() {
    return { message: 'Backend is live!' };
  }

  // Protected route, requires Administrator role (or Super User bypass)
  @Get('admin-test')
  @Roles('Administrator')
  adminTest() {
    return { message: 'Success! You have Administrator access.' };
  }
}
