import { Router } from 'express';
import { MenuController } from '@controllers/menu';

import { authenticate } from './middlewares/authenticate';
import authorize from './middlewares/authorize';

import { ProfileType } from '../utils/models/enumerators';

const MenuRoutes = Router();
const menuController = new MenuController();

MenuRoutes.post(
  '/menu',
  authenticate,
  authorize([ProfileType.ADMIN, ProfileType.FOOD_STORE_ADMIN]),
  menuController.create
);

MenuRoutes.get('/menu', authenticate, menuController.selectWithPagination);

MenuRoutes.get('/menu/:id', authenticate, menuController.selectById);

MenuRoutes.put(
  '/menu-block/:id',
  authenticate,
  authorize([ProfileType.ADMIN, ProfileType.FOOD_STORE_ADMIN]),
  menuController.block
);

MenuRoutes.put(
  '/menu-unblock/:id',
  authenticate,
  authorize([ProfileType.ADMIN, ProfileType.FOOD_STORE_ADMIN]),
  menuController.unblock
);

MenuRoutes.delete(
  '/menu/:id',
  authenticate,
  authorize([ProfileType.ADMIN, ProfileType.FOOD_STORE_ADMIN]),
  menuController.delete
);

export { MenuRoutes };
