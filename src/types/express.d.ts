import { User } from '../repos/user.repo';

//定義 global User add Request的型別
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
