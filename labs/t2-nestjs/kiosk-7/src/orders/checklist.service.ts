import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

// m17 glue #1 - Kiosk-7 hands every order slip to Meenakshi:
// each new order starts a Camunda process instance of order-fulfilment.
// If Camunda is not running (m07-m09 labs), orders simply skip the checklist.
@Injectable()
export class ChecklistService implements OnModuleInit {
  private readonly log = new Logger('Checklist');
  private zeebe: any = null;

  onModuleInit() {
    try {
      process.env.ZEEBE_ADDRESS = process.env.ZEEBE_ADDRESS || 'localhost:26500';
      process.env.CAMUNDA_SECURE_CONNECTION = 'false';
      process.env.CAMUNDA_OAUTH_DISABLED = 'true';
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { Camunda8 } = require('@camunda8/sdk');
      this.zeebe = new Camunda8().getZeebeGrpcApiClient();
      this.log.log('Meenakshi is on duty (Zeebe client ready on :26500)');
    } catch {
      this.log.warn('Camunda SDK unavailable — orders will skip the checklist');
    }
  }

  async startOrderChecklist(orderId: number) {
    if (!this.zeebe) return;
    try {
      const res = await this.zeebe.createProcessInstance({
        bpmnProcessId: 'order-fulfilment',
        variables: { orderId },
      });
      this.log.log('📋 Order #' + orderId + ' handed to Meenakshi — instance ' + res.processInstanceKey);
    } catch (e: any) {
      this.log.warn('Checklist not started for order ' + orderId + ': ' + (e.message || e).toString().slice(0, 80));
    }
  }
}
