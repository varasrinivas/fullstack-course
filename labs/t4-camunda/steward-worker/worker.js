// m14 - the steward worker: signs up for the notify-kitchen bell.
// Works against Camunda 8 Run (or any local Zeebe) on localhost:26500, no auth.
process.env.ZEEBE_ADDRESS = 'localhost:26500';
process.env.CAMUNDA_SECURE_CONNECTION = 'false';
process.env.CAMUNDA_OAUTH_DISABLED = 'true';

const { Camunda8 } = require('@camunda8/sdk');
const zeebe = new Camunda8().getZeebeGrpcApiClient();

zeebe.createWorker({
  taskType: 'notify-kitchen',
  taskHandler: (job) => {
    console.log('🔔 Bell! Notifying kitchen for order', job.variables.orderId);
    return job.complete();
  },
});
console.log('Steward worker listening for notify-kitchen jobs...');
