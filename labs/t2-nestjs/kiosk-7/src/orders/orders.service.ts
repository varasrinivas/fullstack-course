import { Injectable } from '@nestjs/common';
import { ChecklistService } from './checklist.service';
import { CreateOrderDto } from './create-order.dto';

// m08 - the back-office clerk: stamps and files order slips
@Injectable()
export class OrdersService {
  private orders: any[] = []; // the tray (in-memory)

  constructor(private readonly checklist: ChecklistService) {}

  create(dto: CreateOrderDto) {
    const order = { id: this.orders.length + 1, ...dto, status: 'RECEIVED' };
    this.orders.push(order);
    void this.checklist.startOrderChecklist(order.id); // m17 glue #1
    return order;
  }

  findAll() {
    return this.orders;
  }

  // m16/m17 - the rail consumer flips statuses here
  updateStatus(id: number, status: string) {
    const order = this.orders.find((o) => o.id === id);
    if (order) order.status = status;
    return order;
  }

  findOne(id: number) {
    return this.orders.find((o) => o.id === id);
  }
}
