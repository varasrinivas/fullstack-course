// Bonus helper: deploy the process and start one instance without the Modeler.
// Usage: node deploy-and-start.js [orderId]
process.env.ZEEBE_ADDRESS = 'localhost:26500';
process.env.CAMUNDA_SECURE_CONNECTION = 'false';
process.env.CAMUNDA_OAUTH_DISABLED = 'true';

const path = require('path');
const { Camunda8 } = require('@camunda8/sdk');
const zeebe = new Camunda8().getZeebeGrpcApiClient();

const orderId = Number(process.argv[2] || 42);

async function main() {
  const deploy = await zeebe.deployResource({
    processFilename: path.join(__dirname, '..', 'order-process.bpmn'),
  });
  console.log('Deployed:', deploy.deployments[0].process.bpmnProcessId,
              'version', deploy.deployments[0].process.version);

  const instance = await zeebe.createProcessInstance({
    bpmnProcessId: 'order-fulfilment',
    variables: { orderId },
  });
  console.log('Order #' + orderId, 'is on the checklist — instance',
              instance.processInstanceKey);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
