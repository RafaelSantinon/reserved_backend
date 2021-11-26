import { Router } from 'express';
import { AuthenticateController } from '@controllers/authenticate';
import { UserController } from '@controllers/user';

import { authenticate } from './middlewares/authenticate';
import authorize from './middlewares/authorize';

import { ProfileType } from './models/enumerators';

const routes = Router();

const authenticateController = new AuthenticateController();
const userController = new UserController();

routes.post('/login', authenticateController.login);

routes.post('/user', userController.create);

routes.post(
  'food-store',
  authenticate,
  authorize([ProfileType.ADMIN, ProfileType.FOOD_STORE_ADMIN])
);

export { routes };
