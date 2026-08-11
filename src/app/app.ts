import express, { type Application } from 'express';
import routerV1 from './routes/v1/index.js';
import routerV2 from './routes/v2/index.js';
import cros from 'cors';
import cookieParser from 'cookie-parser';
import { loggerMiddleware } from './middleware/logger.middleware.js';

export function createServerApplication(): Application {
  const app = express();
  app.use(cros());
  app.use(express.json());
  app.use(cookieParser());
  app.use(loggerMiddleware);

  // Mount the global router with a version prefix
  app.use('/api/v1', routerV1);
  // Mount the global router with a version prefix
  app.use('/api/v2', routerV2);

  return app;
}
