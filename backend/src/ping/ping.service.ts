import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class PingService {
  private pingStream$ = new Subject<{ data: string }>();

  constructor(private readonly redisService: RedisService) {}

  async addPingMessage(message: string) {
    console.log('📤 Received ping message in service:', message);
    await this.redisService.addToStream('pings', { message });
  }

  emitPong() {
    this.pingStream$.next({ data: 'pong' });
  }

  getPingStream(): Observable<{ data: string }> {
    return this.pingStream$.asObservable();
  }
}
