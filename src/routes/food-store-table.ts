import { Router } from 'express';
import { FoodStoreTableController } from '@controllers/food-store-table';

import { authenticate } from './middlewares/authenticate';
import authorize from './middlewares/authorize';

import { ProfileType } from '../utils/models/enumerators';

const FoodStoreTableRoutes = Router();
const foodStoreTableController = new FoodStoreTableController();

FoodStoreTableRoutes.post(
  '/food-store-table',
  authenticate,
  authorize([ProfileType.ADMIN, ProfileType.FOOD_STORE_ADMIN]),
  foodStoreTableController.create
);

FoodStoreTableRoutes.get(
  '/food-store-table',
  authenticate,
  foodStoreTableController.selectWithPagination
);

FoodStoreTableRoutes.get(
  '/food-store-table/:id',
  authenticate,
  foodStoreTableController.selectById
);

FoodStoreTableRoutes.put(
  '/food-store-table/:id',
  authenticate,
  authorize([ProfileType.ADMIN, ProfileType.FOOD_STORE_ADMIN]),
  foodStoreTableController.updateById
);

FoodStoreTableRoutes.put(
  '/food-store-table-block/:id',
  authenticate,
  authorize([ProfileType.ADMIN, ProfileType.FOOD_STORE_ADMIN]),
  foodStoreTableController.block
);

FoodStoreTableRoutes.put(
  '/food-store-table-unblock/:id',
  authenticate,
  authorize([ProfileType.ADMIN, ProfileType.FOOD_STORE_ADMIN]),
  foodStoreTableController.unblock
);

FoodStoreTableRoutes.delete(
  '/food-store-table/:id',
  authenticate,
  authorize([ProfileType.ADMIN, ProfileType.FOOD_STORE_ADMIN]),
  foodStoreTableController.delete
);

export { FoodStoreTableRoutes };
