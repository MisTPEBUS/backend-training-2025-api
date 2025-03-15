import dotenv from 'dotenv';

dotenv.config();

export default {
  JWT_SECRET: process.env.JWT_SECRET || 'defaultSecret',
  JWT_EXPIRES_DAY: process.env.JWT_EXPIRES_DAY || '100d',
  BCRYPT_SALT: parseInt(process.env.BCRYPT_SALT || '10', 10),
};
