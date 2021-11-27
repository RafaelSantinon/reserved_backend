import { Router } from 'express';

import { AuthenticateRoutes } from './authenticate';
import { FoodStoreRoutes } from './food-store';
import { MenuItemRoutes } from './menu-item';
import { MenuRoutes } from './menu';
import { UserRoutes } from './user';

const routes = Router();

routes.use(AuthenticateRoutes);
routes.use(FoodStoreRoutes);
routes.use(MenuItemRoutes);
routes.use(MenuRoutes);
routes.use(UserRoutes);

export { routes };
