import { Module } from '@nestjs/common';
import { ChecklistService } from './checklist.service';
import { OrdersController } from './orders.controller';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';
import { RailConsumer } from './rail.consumer';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrdersResolver, ChecklistService, RailConsumer],
})
export class OrdersModule {}
