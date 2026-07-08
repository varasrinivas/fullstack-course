import { Module } from '@nestjs/common';
import { ChecklistService } from './checklist.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { RailConsumer } from './rail.consumer';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, ChecklistService, RailConsumer],
})
export class OrdersModule {}
