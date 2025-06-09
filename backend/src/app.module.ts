import { Module } from '@nestjs/common';
import { PingController } from './ping/ping.controller';
import { PingService } from './ping/ping.service';
import { RedisService } from './redis/redis.service';
import { PingProcessorService } from './ping/ping.processor';

@Module({
  imports: [],
  controllers: [PingController],
  providers: [PingService, RedisService, PingProcessorService],
})
export class AppModule {}
