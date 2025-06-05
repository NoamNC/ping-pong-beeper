import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { PingGateway } from './ping.gateway';

@Injectable()
export class PingProcessorService implements OnModuleInit {
  constructor(
    private readonly redisService: RedisService,
    private readonly gateway: PingGateway,
  ) {}

  onModuleInit(): void {
    console.log('🔁 Ping processor loop started');
    this.startListening();
  }

  private startListening() {
    this.listenForPings().catch((err) =>
      console.error('❌ Failed to start ping listener:', err),
    );
  }

  private async listenForPings() {
    await this.redisService.waitUntilReady();

    let lastId = '$';

    while (true) {
      try {
        console.log('🧪 Reading stream from ID:', lastId);
        const entries = await this.redisService.readStream(
          'pings',
          lastId,
          5000,
        );
        if (!entries.length) {
          console.log('🧪 Redis stream is empty');
          continue;
        }

        console.log('✅ Stream has messages!');
        console.log('🧪 Redis returned:', JSON.stringify(entries, null, 2));

        for (const { messages } of entries) {
          for (const { id, message } of messages) {
            console.log('📩 Raw message:', message);

            if (message.message === 'ping') {
              console.log('🎯 Processing ping -> pong');
              this.gateway.sendMessage('pong');
            }

            lastId = id;
          }
        }
      } catch (err) {
        console.error('❌ Redis stream read failed:', err);
        await new Promise((res) => setTimeout(res, 1000));
      }
    }
  }
}
