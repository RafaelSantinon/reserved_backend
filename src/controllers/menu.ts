import { Request, Response } from 'express';
import { MenuService } from '@services/menu';

const menuService = new MenuService();

class MenuController {
  async create(req: Request, res: Response) {
    const { idFoodStore, type } = req.body;

    await menuService.create({
      idFoodStore,
      type,
    });

    return res.status(204).end();
  }

  async selectById(req: Request, res: Response) {
    const menu = await menuService.selectById(req.params.id);

    return res.json(menu);
  }

  async selectWithPagination(req: Request, res: Response) {
    const searchParameter = {
      idFoodStore: req.query.idFoodStore as string,
      type: req.query.type as string,
      offset: parseInt(req.query.offset as string, 10) as number,
      orderBy: req.query.orderBy as string,
      isDESC: req.query.isDESC as string,
      limit: parseInt(req.query.limit as string, 10) as number,
    };

    const menus = await menuService.selectWithPagination(searchParameter);

    return res.json(menus);
  }

  async block(req: Request, res: Response) {
    const { idUser } = req;

    await menuService.block(req.params.id, idUser);

    return res.status(204).end();
  }

  async unblock(req: Request, res: Response) {
    const { idUser } = req;

    await menuService.unblock(req.params.id, idUser);

    return res.status(204).end();
  }

  async delete(req: Request, res: Response) {
    const { idUser } = req;

    await menuService.delete(req.params.id, idUser);

    return res.status(204).end();
  }
}

export { MenuController };
