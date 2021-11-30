import { Router } from 'express';
import { CheckoutController } from '@controllers/checkout';

import { authenticate } from './middlewares/authenticate';
import authorize from './middlewares/authorize';

import { ProfileType } from '../utils/models/enumerators';

const CheckoutRoutes = Router();
const checkoutController = new CheckoutController();

CheckoutRoutes.post(
  '/checkout',
  authenticate,
  authorize([ProfileType.USER]),
  checkoutController.create
);

CheckoutRoutes.get(
  '/checkout',
  authenticate,
  checkoutController.selectWithPagination
);

CheckoutRoutes.get(
  '/checkout/:id',
  authenticate,
  checkoutController.selectById
);

CheckoutRoutes.put(
  '/checkout/:id',
  authenticate,
  authorize([
    ProfileType.ADMIN,
    ProfileType.FOOD_STORE_ADMIN,
    ProfileType.TABLE_ADMIN,
  ]),
  checkoutController.updateById
);

export { CheckoutRoutes };
