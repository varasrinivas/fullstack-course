import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Kiosk-7 online 🟢 What would you like to order?';
  }
}
