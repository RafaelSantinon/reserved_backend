import { Router } from 'express';
import { CheckoutItemController } from '@controllers/checkout-item';

import { authenticate } from './middlewares/authenticate';
import authorize from './middlewares/authorize';

import { ProfileType } from '../utils/models/enumerators';

const CheckoutItemRoutes = Router();
const checkoutItemController = new CheckoutItemController();

CheckoutItemRoutes.post(
  '/checkout-item',
  authenticate,
  authorize([ProfileType.USER]),
  checkoutItemController.create
);

CheckoutItemRoutes.get(
  '/checkout-item',
  authenticate,
  checkoutItemController.selectWithPagination
);

export { CheckoutItemRoutes };
