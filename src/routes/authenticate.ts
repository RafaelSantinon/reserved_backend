import { Router } from 'express';
import { AuthenticateController } from '@controllers/authenticate';

const AuthenticateRoutes = Router();
const authenticateController = new AuthenticateController();

AuthenticateRoutes.post('/login', authenticateController.login);

export { AuthenticateRoutes };
