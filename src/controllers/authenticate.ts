import { Request, Response } from 'express';
import { AuthenticateService } from '../services/authenticate';

const authenticateService = new AuthenticateService();

class AuthenticateController {
  async login(req: Request, res: Response) {
    const token = await authenticateService.login({
      email: req.body.email,
      password: req.body.password,
    });

    return res.json(token);
  }
}

export { AuthenticateController };
