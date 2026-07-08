import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { OrdersService } from './orders.service';

// m16 - the kitchen's runner: watches the rail, grabs paid tickets.
// If Kafka is not running (m07-m09 labs), it logs a warning and stays quiet.
@Injectable()
export class RailConsumer implements OnModuleInit {
  private readonly log = new Logger('RailConsumer');

  constructor(private readonly orders: OrdersService) {}

  async onModuleInit() {
    try {
      const kafka = new Kafka({
        clientId: 'kiosk-7',
        brokers: ['localhost:9092'],
        retry: { retries: 2 },
      });
      const consumer = kafka.consumer({ groupId: 'biryani-kitchen' });
      await consumer.connect();
      await consumer.subscribe({ topic: 'order.paid', fromBeginning: true });
      await consumer.run({
        eachMessage: async ({ message }) => {
          const key = message.key ? message.key.toString() : '';
          const value = message.value ? message.value.toString() : '';
          this.log.log('🎟 Ticket grabbed: ' + value);
          if (key) this.orders.updateStatus(Number(key), value); // e.g. "PAID-42"
        },
      });
      this.log.log('Watching the rail (topic order.paid, group biryani-kitchen)');
    } catch (e) {
      this.log.warn('Ticket rail not reachable on localhost:9092 — running without events (fine for m07-m09)');
    }
  }
}
