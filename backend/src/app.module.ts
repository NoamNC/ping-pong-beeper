import { Module } from '@nestjs/common';
import { PingController } from './ping/ping.controller';
import { PingService } from './ping/ping.service';
import { PingGateway } from './ping/ping.gateway';
import { RedisService } from './redis/redis.service';
import { PingProcessorService } from './ping/ping.processor';

@Module({
  imports: [],
  controllers: [PingController],
  providers: [PingService, PingGateway, RedisService, PingProcessorService],
})
export class AppModule {}
