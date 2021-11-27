import { Router } from 'express';

import { AuthenticateRoutes } from './authenticate';
import { UserRoutes } from './user';

const routes = Router();

routes.use(AuthenticateRoutes);
routes.use(UserRoutes);

export { routes };
