import { Router } from 'express';

import { AuthenticateRoutes } from './authenticate';
import { userRoutes } from './user';

const routes = Router();

routes.use(AuthenticateRoutes);
routes.use(userRoutes);

export { routes };
