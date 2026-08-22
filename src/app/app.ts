import express, { type Application } from 'express';
import routerV1 from './routes/v1/index.js';
import routerV2 from './routes/v2/index.js';
import cros from 'cors';
import cookieParser from 'cookie-parser';
import { loggerMiddleware } from './middleware/logger.middleware.js';
import path from 'node:path';

export function createServerApplication(): Application {
  const app = express();
  app.use(cros());
  app.use(express.json());
  app.use(cookieParser());
  app.use(loggerMiddleware);

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Mount the global router with a version prefix
  app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
  });

  app.use('/api/v1', routerV1);
  // Mount the global router with a version prefix
  app.use('/api/v2', routerV2);

  return app;
}
