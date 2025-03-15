import axios from 'axios';
import { Router } from 'express';

import courseRouter from './admin/coaches.course.routes';
import coachesRouter from './admin/coaches.routes';
import creditPackageAdminRouter from './admin/creditPackage.routes';
import creditPackageRouter from './user/creditPackage.routes';
import skillRouter from './user/skill.routes';
import userRouter from './user/user.routes';

const routers = Router();

// 後台
routers.use('/admin/credit-package', creditPackageAdminRouter);
routers.use('/admin/coaches', coachesRouter);
routers.use('/admin/coaches/courses', courseRouter);
/* routers.use('/admin/coaches/courses',courseController); */

//test Telegram send Msg API
routers.use('/sendMsg', async () => {
  const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
  if (!TELEGRAM_TOKEN) {
    throw new Error('請在環境變數中設定 TELEGRAM_TOKEN');
  }

  const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

  /**
   * 發送 Telegram 訊息
   * @param chatId - 目標聊天 ID (個人或群組)
   * @param text - 要發送的訊息文字
   */
  async function sendTelegramMessage(chatId: number | string, text: string) {
    try {
      const url = `${TELEGRAM_API}/sendMessage`;
      const response = await axios.post(url, {
        chat_id: chatId,
        text: text,
      });
      console.log('訊息發送結果:', response.data);
    } catch (error) {
      console.error('訊息發送失敗:', error);
    }
  }

  // chatId 替換為實際的聊天 ID (例如個人 chat ID 或群組 chat ID)
  const exampleChatId = 7796831957; // 替換為實際的 chat ID
  const exampleMessage = 'Hello ~ Node.js + TypeScript! ^.^ ';

  await sendTelegramMessage(exampleChatId, exampleMessage);
});
// 前台
routers.use('/users', userRouter);
/* routers.use('/coaches'); */

routers.use('/credit-package', creditPackageRouter);
routers.use('/coaches/skill', skillRouter);

export default routers;
