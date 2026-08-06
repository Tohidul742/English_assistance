import express, { type Application } from 'express';
import router from './routes/index.js';
import cros from 'cors';
import { loggerMiddleware } from './middleware/logger.middleware.js';

export function createServerApplication(): Application {
  const app = express();
  app.use(cros());
  app.use(express.json());
  app.use(loggerMiddleware);
  app.use(router);
  return app;
}
