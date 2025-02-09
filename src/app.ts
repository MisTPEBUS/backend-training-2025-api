import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';

import Router from './routers/index';
import logger from './middleware/logger';

const app: Application = express();

// Express Middlewares
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(express.json());

// Root Route
app.use('/v1/api', Router);
app.get('/OPTION', (req: Request, res: Response) => {
  res.status(200).json();
});

//Route 404
app.use((req: Request, res: Response) => {
  logger.error(`404 :${req.path}`);
  res.status(404).json({
    status: 'error',
    message: '查無此路由，請確認 API 格式!',
  });
});

// middleware全域錯誤處理
app.use((err: any, req: Request, res: Response) => {
  err.statusCode = err.statusCode || 500;
  logger.error(`500 :${req.path}-${err.message}`);
  if (process.env.NODE_ENV === 'dev') {
    return res.status(err.statusCode).json({
      message: err.message,
      error: err,
      stack: err.stack,
    });
  } else {
    return res.status(err.statusCode).json({
      status: false,
      message: err.isOperational ? err.message : '系統錯誤',
      data: {},
      code: err.code || err.statusCode,
    });
  }
});

export default app;
