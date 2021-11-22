import { Request, Response } from 'express';
import { CreateUserService } from '@services/CreateUserService';

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { type, name, email, cellphone, bornAt } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      type,
      name,
      email,
      cellphone,
      bornAt,
    });

    return res.json(user);
  }
}

export { CreateUserController };
