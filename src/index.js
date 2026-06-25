const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;
const APP_ENV = process.env.APP_ENV || 'local';
const APP_MESSAGE = process.env.APP_MESSAGE || 'GitOps mini application';

app.get('/', (req, res) => {
  res.json({
    message: APP_MESSAGE,
    environment: APP_ENV,
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'gitops-branch-environments',
  });
});

app.get('/config', (req, res) => {
  res.json({
    appName: 'GitOps Branch Environments',
    environment: APP_ENV,
    port: PORT,
    message: APP_MESSAGE,
  });
});

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
  console.log(`Active environment: ${APP_ENV}`);
});
