import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './create-order.dto';
import { OrdersService } from './orders.service';

// m08 - the front-desk clerk: takes the slip, hands it to the back office
@Controller('orders')
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.orders.create(dto);
  }

  @Get()
  findAll() {
    return this.orders.findAll();
  }

  @Get(':id/status')
  status(@Param('id') id: string) {
    const order = this.orders.findOne(Number(id));
    return { orderId: Number(id), status: order ? order.status : 'UNKNOWN' };
  }
}
