import axios from 'axios';
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
  return res.status(200).json();
});

//設定bot
app.post('/sendMsg', async (req: Request, res: Response) => {
  const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
  if (!TELEGRAM_TOKEN) {
    return res.status(500).json({ error: '請在環境變數中設定 TELEGRAM_TOKEN' });
  }

  const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

  // 從請求中取得 chatId 與 text
  const { chat_id, text } = req.body;
  console.log(chat_id);
  if (!chat_id || !text) {
    return res.status(400).json({ error: '請提供 chatId 與 text 參數' });
  }

  try {
    const url = `${TELEGRAM_API}/sendMessage`;
    const response = await axios.post(url, {
      chat_id: chat_id,
      text: text,
    });
    console.log('訊息發送結果:', response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('訊息發送失敗:', error);
    return res.status(500).json({ error: '訊息發送失敗', details: error });
  }
});
//Route 404
app.use(NotFound);

// middleware全域錯誤處理
app.use(errorHandler);

export default app;
