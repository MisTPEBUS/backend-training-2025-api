import { Router } from 'express';

import creditPackageAdminRouter from './admin/creditPackage.routes';
import creditPackageRouter from './user/creditPackage.routes';
import skillRouter from './user/skill.routes';

const routers = Router();

// 後台
routers.use('/admin/credit-package', creditPackageAdminRouter);

// 前台
routers.use('/credit-package', creditPackageRouter);

routers.use('/coaches/skill', skillRouter);

export default routers;
