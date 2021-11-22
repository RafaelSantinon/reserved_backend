import { Router } from 'express';
import { CreateUserController } from '@controllers/CreateUserController';

const routes = Router();

const createUserController = new CreateUserController();

routes.post('/user', createUserController.handle);

export { routes };
