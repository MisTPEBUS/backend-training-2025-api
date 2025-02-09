import { Router } from 'express';
import creditPackageController from '../../controllers/creditPackage.controller';
import validateRequest from '../../middleware/validateRequest';
import { createCreditPackageSchema } from '../../validators/creditPackage.dto';

const creditPackageRouter = Router();

creditPackageRouter.get('/', creditPackageController.getPublicCreditPackage);
creditPackageRouter.post('/', validateRequest(createCreditPackageSchema), creditPackageController.createCreditPackage);
creditPackageRouter.delete('/:creditPackageId', creditPackageController.deleteCreditPackage);

export default creditPackageRouter;
