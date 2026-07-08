// m17 glue #2 - the notify-kitchen bell now does something REAL:
// the worker rings the Billing Room (Spring Boot :8082), which pins
// PAID-<orderId> on the ticket rail (Kafka topic order.paid).
process.env.ZEEBE_ADDRESS = 'localhost:26500';
process.env.CAMUNDA_SECURE_CONNECTION = 'false';
process.env.CAMUNDA_OAUTH_DISABLED = 'true';

const { Camunda8 } = require('@camunda8/sdk');
const zeebe = new Camunda8().getZeebeGrpcApiClient();

zeebe.createWorker({
  taskType: 'notify-kitchen',
  taskHandler: async (job) => {
    const orderId = job.variables.orderId;
    console.log('🔔 Bell! Order', orderId, '- ringing the Billing Room...');
    try {
      const res = await fetch('http://localhost:8082/bills?orderId=' + orderId, { method: 'POST' });
      console.log('💰 Billing Room says:', await res.text());
    } catch (e) {
      console.log('⚠ Billing Room did not answer:', e.message);
    }
    return job.complete();
  },
});
console.log('Steward worker (m17 capstone) listening for notify-kitchen jobs...');
