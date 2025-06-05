// src/redis/redis.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

interface StreamEntry {
  id: string;
  message: Record<string, string>;
}

interface StreamResponse {
  stream: string;
  messages: StreamEntry[];
}

@Injectable()
export class RedisService implements OnModuleInit {
  private client: RedisClientType;
  private isReady = false;

  async onModuleInit(): Promise<void> {
    this.client = createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    });

    this.client.on('error', (err) => {
      console.error('❌ Redis Client Error:', err);
    });

    await this.client.connect();
    this.isReady = true;
    console.log('✅ Redis connected');
  }

  waitUntilReady(): Promise<void> {
    return new Promise((resolve) => {
      const check = () => {
        if (this.isReady) resolve();
        else setTimeout(check, 50);
      };
      check();
    });
  }

  async addToStream(
    stream: string,
    message: Record<string, string>,
  ): Promise<string> {
    try {
      console.log(`🧾 XADD to stream "${stream}" with:`, message);

      const id = await this.client.xAdd(stream, '*', message);

      console.log(`✅ Message written to stream with ID: ${id}`);
      return id;
    } catch (err) {
      console.error('❌ Failed to write to Redis stream:', err);
      throw err;
    }
  }

  async readStream(
    stream: string,
    lastId: string,
    blockMs = 5000,
  ): Promise<StreamResponse[]> {
    const response = await this.client.sendCommand([
      'XREAD',
      'BLOCK',
      blockMs.toString(),
      'COUNT',
      '1',
      'STREAMS',
      stream,
      lastId,
    ]);

    console.log('🧪 Redis raw response:', JSON.stringify(response));

    if (!response || !Array.isArray(response)) return [];

    return response.map(
      ([streamName, messages]: [string, [string, string[]][]]) => ({
        stream: streamName,
        messages: messages.map(([id, fields]) => {
          const entry: Record<string, string> = {};
          for (let i = 0; i < fields.length; i += 2) {
            entry[fields[i]] = fields[i + 1];
          }
          return { id, message: entry };
        }),
      }),
    );
  }
}
