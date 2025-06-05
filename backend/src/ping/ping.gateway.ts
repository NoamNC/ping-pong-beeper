import { Injectable, OnModuleInit } from '@nestjs/common';
import * as WS from 'ws';

@Injectable()
export class PingGateway implements OnModuleInit {
  private server: WS.WebSocketServer;

  onModuleInit(): void {
    const port = Number(process.env.WS_PORT || 6789);
    this.server = new WS.WebSocketServer({ port, host: '0.0.0.0' });

    this.server.on('connection', (socket) => {
      console.log('📥 WebSocket client connected');
      socket.send('✅ Connected to WebSocket server!');
    });

    this.server.on('listening', () => {
      const addr = this.server.address() as WS.AddressInfo;
      console.log(`🟢 WebSocket server bound to: ${addr.address}:${addr.port}`);
    });
  }

  public sendMessage(message: string): void {
    console.log('📡 Broadcasting message:', message);
    for (const client of this.server.clients) {
      if (client.readyState === WS.OPEN) {
        client.send(message);
      }
    }
  }
}
