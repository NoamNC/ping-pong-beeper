import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { PingGateway } from './ping.gateway';

@Injectable()
export class PingService implements OnModuleInit {
  constructor(
    private readonly redisService: RedisService,
    @Inject(forwardRef(() => PingGateway))
    private readonly gateway: PingGateway,
  ) {
    console.log('🚨 Injected gateway:', gateway);
  }

  async onModuleInit() {
    await this.redisService.waitUntilReady();
  }

  async handlePing(message: string) {
    await this.redisService.addToStream('stream:pingpong', { message });
  }

  async addPingMessage(message: string) {
    console.log('📤 Received ping message in service:', message);
    await this.redisService.addToStream('pings', { message });

    if (message === 'ping') {
      console.log('✅ Calling gateway.sendMessage("pong")');
      this.gateway.sendMessage('pong');
    }
  }
}
