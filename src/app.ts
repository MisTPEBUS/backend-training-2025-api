import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';

import { errorHandler } from './middleware/errorHandler';
import routers from './routers';
import { NotFound } from './utils/appResponse';

const app: Application = express();
// Express Middlewares
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(express.json());
app.use(bodyParser.json());

// Root Route
app.use('/api', routers);

app.get('/OPTION', (req: Request, res: Response) => {
  res.status(200).json();
});

//Route 404
app.use(NotFound);

// middleware全域錯誤處理
app.use(errorHandler);

export default app;
