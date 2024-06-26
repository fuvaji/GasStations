import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hello from NestJS!';
  }

  @Get('api/data')
  getData(): { message: string } {
    return { message: 'Hello from the API!' };
  }
}
