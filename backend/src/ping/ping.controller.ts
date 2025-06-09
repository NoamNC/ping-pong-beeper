import { Controller, Post, Body, Sse, MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
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
    return { status: 'pong sent via SSE' };
  }

  @Sse('stream')
  stream(): Observable<MessageEvent> {
    return this.pingService.getPingStream();
  }
}
