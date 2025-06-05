import { Controller, Post, Body } from '@nestjs/common';
import { PingService } from './ping.service';

@Controller('api/ping')
export class PingController {
  constructor(private readonly pingService: PingService) {}
  @Post()
  async ping(@Body('message') message: string) {
    if (!message) {
      return { error: 'No message provided' };
    }
    await this.pingService.addPingMessage(message);
    return { status: 'pong sent via WebSocket' }; // optional response
  }
}
