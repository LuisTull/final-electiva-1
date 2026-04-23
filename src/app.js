const express = require('express');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const client = require('prom-client');
const { initDb, getItems, addItem, healthCheck } = require('./db');
const { validateItemName } = require('./validation');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '..', 'public')));

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const requestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register]
});

app.use((req, res, next) => {
  res.on('finish', () => {
    requestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status_code: String(res.statusCode)
    });
  });
  next();
});

app.get('/api/health', async (req, res) => {
  try {
    await healthCheck();
    res.status(200).json({ status: 'ok', service: 'web-api' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.get('/api/items', async (req, res) => {
  try {
    const items = await getItems();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/items', async (req, res) => {
  const result = validateItemName(req.body && req.body.name);
  if (!result.valid) {
    res.status(400).json({ message: result.error });
    return;
  }

  try {
    const item = await addItem(result.value);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = {
  app,
  initDb
};
