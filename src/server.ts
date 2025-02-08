// server.ts
import App from './app';
import prisma from './prisma';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log('成功連線到資料庫');

    App.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error('資料庫連線失敗:', error);
    process.exit(1);
  }
}

startServer();
