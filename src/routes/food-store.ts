import { Router } from 'express';
import { FoodStoreController } from '@controllers/food-store';

import { authenticate } from '../middlewares/authenticate';
import authorize from '../middlewares/authorize';

import { ProfileType } from '../models/enumerators';

const FoodStoreRoutes = Router();
const foodStoreController = new FoodStoreController();

FoodStoreRoutes.post(
  '/food-store',
  authenticate,
  authorize([ProfileType.ADMIN]),
  foodStoreController.create
);

FoodStoreRoutes.get(
  '/food-store',
  authenticate,
  foodStoreController.selectWithPagination
);

FoodStoreRoutes.get(
  '/food-store/:id',
  authenticate,
  foodStoreController.selectById
);

FoodStoreRoutes.put(
  '/food-store/:id',
  authenticate,
  authorize([ProfileType.ADMIN, ProfileType.FOOD_STORE_ADMIN]),
  foodStoreController.updateById
);

FoodStoreRoutes.put(
  '/food-store-block/:id',
  authenticate,
  authorize([ProfileType.ADMIN]),
  foodStoreController.block
);

FoodStoreRoutes.put(
  '/food-store-unblock/:id',
  authenticate,
  authorize([ProfileType.ADMIN]),
  foodStoreController.unblock
);

FoodStoreRoutes.delete(
  '/food-store/:id',
  authenticate,
  authorize([ProfileType.ADMIN]),
  foodStoreController.delete
);

export { FoodStoreRoutes };
