import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { ReceiptModule } from './receipt/receipt.module';

@Module({
  imports: [OrdersModule, ReceiptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
