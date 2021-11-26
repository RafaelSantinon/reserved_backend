import { Request, Response } from 'express';
import { UserService } from '@services/user';

class UserController {
  async create(req: Request, res: Response) {
    const { type, name, email, cellphone, bornAt, password } = req.body;

    const userService = new UserService();

    const user = await userService.create({
      type,
      name,
      email,
      cellphone,
      bornAt,
      password,
    });

    return res.json(user);
  }
}

export { UserController };
