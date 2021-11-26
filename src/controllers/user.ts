import { Request, Response } from 'express';
import { UserService } from '@services/user';

const userService = new UserService();

class UserController {
  async create(req: Request, res: Response) {
    const { type, name, email, cellphone, bornAt, password } = req.body;

    await userService.create({
      type,
      name,
      email,
      cellphone,
      bornAt,
      password,
    });

    return res.status(204).end();
  }

  async getMe(req: Request, res: Response) {
    const { idUser } = req;

    const me = await userService.getMe(idUser);

    return res.json(me);
  }

  async selectById(req: Request, res: Response) {
    const user = await userService.selectById(req.params.id);

    return res.json(user);
  }

  async selectWithPagination(req: Request, res: Response) {
    const users = await userService.selectWithPagination();

    return res.json(users);
  }

  async updateById(req: Request, res: Response) {
    const { name, email, cellphone } = req.body;
    const { idUser } = req;

    await userService.updateById(
      req.params.id,
      {
        name,
        email,
        cellphone,
      },
      idUser
    );

    return res.status(204).end();
  }

  async block(req: Request, res: Response) {
    const { idUser } = req;

    await userService.block(req.params.id, idUser);

    return res.status(204).end();
  }

  async unblock(req: Request, res: Response) {
    const { idUser } = req;

    await userService.unblock(req.params.id, idUser);

    return res.status(204).end();
  }

  async delete(req: Request, res: Response) {
    const { idUser } = req;

    await userService.delete(req.params.id, idUser);

    return res.status(204).end();
  }
}

export { UserController };
