import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { PingService } from './ping.service';

@Injectable()
export class PingProcessorService implements OnModuleInit {
  constructor(
    private readonly redisService: RedisService,
    private readonly pingService: PingService,
  ) {}

  onModuleInit(): void {
    void this.startListening();
  }

  private async startListening() {
    await this.redisService.waitUntilReady();
    let lastId = '0-0';

    while (true) {
      try {
        const entries = await this.redisService.readStream(
          'pings',
          lastId,
          5000,
        );

        for (const { messages } of entries) {
          for (const { id, message } of messages) {
            if (message.message === 'ping') {
              this.pingService.emitPong();
            }
            lastId = id;
          }
        }
      } catch (err) {
        console.error('Redis stream error:', err);
        await new Promise((res) => setTimeout(res, 1000));
      }
    }
  }
}
