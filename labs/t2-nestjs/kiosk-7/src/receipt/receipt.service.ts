import { BadGatewayException, Injectable } from '@nestjs/common';

// m09 - the BFF fan-out: ring both kitchens at once, print one receipt
@Injectable()
export class ReceiptService {
  async receipt() {
    let kitchen: any, billing: any;
    try {
      [kitchen, billing] = await Promise.all([
        fetch('http://localhost:3100/kitchen').then((r) => r.json()),
        fetch('http://localhost:3100/billing').then((r) => r.json()),
      ]);
    } catch (e) {
      throw new BadGatewayException('A kitchen did not answer (is json-server running on :3100?)');
    }
    return {
      // one receipt, UI-shaped
      orderId: kitchen.orderId,
      item: kitchen.item,
      status: kitchen.status,
      total: billing.total,
      paid: billing.paid,
    };
  }
}
