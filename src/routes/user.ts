import { Router } from 'express';
import { UserController } from '@controllers/user';

import { authenticate } from './middlewares/authenticate';
import authorize from './middlewares/authorize';

import { ProfileType } from '../utils/models/enumerators';

const UserRoutes = Router();
const userController = new UserController();

UserRoutes.post('/user', userController.create);

UserRoutes.get('/me', authenticate, userController.getMe);

UserRoutes.get(
  '/user',
  authenticate,
  authorize([ProfileType.ADMIN]),
  userController.selectWithPagination
);

UserRoutes.get(
  '/user/:id',
  authenticate,
  authorize([ProfileType.ADMIN]),
  userController.selectById
);

UserRoutes.put(
  '/user/:id',
  authenticate,
  authorize([ProfileType.ADMIN, ProfileType.USER]),
  userController.updateById
);

UserRoutes.put(
  '/user-block/:id',
  authenticate,
  authorize([ProfileType.ADMIN]),
  userController.block
);

UserRoutes.put(
  '/user-unblock/:id',
  authenticate,
  authorize([ProfileType.ADMIN]),
  userController.unblock
);

UserRoutes.delete(
  '/user/:id',
  authenticate,
  authorize([ProfileType.ADMIN, ProfileType.USER]),
  userController.delete
);

export { UserRoutes };
