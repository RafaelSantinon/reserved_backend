import { Router } from 'express';
import multer from 'multer';

import { FoodStoreController } from '@controllers/food-store';

import { authenticate } from './middlewares/authenticate';
import authorize from './middlewares/authorize';

import uploadConfig from '../config/upload';

import { ProfileType } from '../utils/models/enumerators';

const FoodStoreRoutes = Router();
const upload = multer(uploadConfig);
const foodStoreController = new FoodStoreController();

FoodStoreRoutes.post(
  '/food-store',
  authenticate,
  authorize([ProfileType.ADMIN]),
  upload.single('image'),
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
