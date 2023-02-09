import express from 'express';
import expressPrometheusMiddleware from 'express-prometheus-middleware';
import { Time } from './interfaces';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);

const { PORT, API_KEY } = process.env;

app.use((req, res, next) => {
  const reqHeader = req.headers.authorization;
  if (!reqHeader || reqHeader !== API_KEY) {
    res.status(403);
    res.send('Authorization Required');
    return;
  }
  next();
});

app.use(
  expressPrometheusMiddleware({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    collectGCMetrics: true,
    metricsApp: app,
  }),
);

app.use('/time', (_, res) => {
  const response: Time = {
    epoch: Math.round(new Date().getTime() / 1000),
  };

  res.send(response);
});

app.listen(PORT || 3001, () => {
  console.log('Express API Started!');
});
