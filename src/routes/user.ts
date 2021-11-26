import { Router } from 'express';
import { UserController } from '@controllers/user';

import { authenticate } from '../middlewares/authenticate';
import authorize from '../middlewares/authorize';

import { ProfileType } from '../models/enumerators';

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/user', userController.create);

userRoutes.get('/me', authenticate, userController.getMe);

userRoutes.get(
  '/user',
  authenticate,
  authorize([ProfileType.ADMIN]),
  userController.selectWithPagination
);

userRoutes.get(
  '/user/:id',
  authenticate,
  authorize([ProfileType.ADMIN]),
  userController.selectById
);

userRoutes.put(
  '/user/:id',
  authenticate,
  authorize([ProfileType.ADMIN, ProfileType.USER]),
  userController.updateById
);

userRoutes.put(
  '/user-block/:id',
  authenticate,
  authorize([ProfileType.ADMIN]),
  userController.block
);

userRoutes.put(
  '/user-unblock/:id',
  authenticate,
  authorize([ProfileType.ADMIN]),
  userController.unblock
);

userRoutes.delete(
  '/user/:id',
  authenticate,
  authorize([ProfileType.ADMIN, ProfileType.USER]),
  userController.delete
);

export { userRoutes };
