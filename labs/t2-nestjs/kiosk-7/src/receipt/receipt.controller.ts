import { Controller, Get } from '@nestjs/common';
import { ReceiptService } from './receipt.service';

@Controller('receipt')
export class ReceiptController {
  constructor(private readonly service: ReceiptService) {}

  @Get()
  receipt() {
    return this.service.receipt();
  }
}
