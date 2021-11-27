import { Router } from 'express';

import { AuthenticateRoutes } from './authenticate';
import { FoodStoreRoutes } from './food-store';
import { UserRoutes } from './user';

const routes = Router();

routes.use(AuthenticateRoutes);
routes.use(FoodStoreRoutes);
routes.use(UserRoutes);

export { routes };
