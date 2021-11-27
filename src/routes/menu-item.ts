import { Router } from 'express';
import { MenuItemController } from '@controllers/menu-item';

import { authenticate } from './middlewares/authenticate';
import authorize from './middlewares/authorize';

import { ProfileType } from '../models/enumerators';

const MenuItemRoutes = Router();
const menuItemController = new MenuItemController();

MenuItemRoutes.post(
  '/menu-item',
  authenticate,
  authorize([ProfileType.ADMIN, ProfileType.FOOD_STORE_ADMIN]),
  menuItemController.create
);

MenuItemRoutes.get(
  '/menu-item',
  authenticate,
  menuItemController.selectWithPagination
);

MenuItemRoutes.get(
  '/menu-item/:id',
  authenticate,
  menuItemController.selectById
);

MenuItemRoutes.put(
  '/menu-item/:id',
  authenticate,
  authorize([ProfileType.ADMIN, ProfileType.FOOD_STORE_ADMIN]),
  menuItemController.updateById
);

MenuItemRoutes.put(
  '/menu-item-block/:id',
  authenticate,
  authorize([ProfileType.ADMIN, ProfileType.FOOD_STORE_ADMIN]),
  menuItemController.block
);

MenuItemRoutes.put(
  '/menu-item-unblock/:id',
  authenticate,
  authorize([ProfileType.ADMIN, ProfileType.FOOD_STORE_ADMIN]),
  menuItemController.unblock
);

MenuItemRoutes.delete(
  '/menu-item/:id',
  authenticate,
  authorize([ProfileType.ADMIN, ProfileType.FOOD_STORE_ADMIN]),
  menuItemController.delete
);

export { MenuItemRoutes };
