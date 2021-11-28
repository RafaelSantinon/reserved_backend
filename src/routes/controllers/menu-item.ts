import { Request, Response } from 'express';
import { MenuItemService } from '@services/menu-item';

const menuItemService = new MenuItemService();

class MenuItemController {
  async create(req: Request, res: Response) {
    const { idMenu, name, description, price } = req.body;

    await menuItemService.create({
      idMenu,
      name,
      description,
      price,
    });

    return res.status(204).end();
  }

  async selectById(req: Request, res: Response) {
    const menuItem = await menuItemService.selectById(req.params.id);

    return res.json(menuItem);
  }

  async selectWithPagination(req: Request, res: Response) {
    const searchParameter = {
      idMenu: req.query.idMenu as string,
      offset: parseInt(req.query.offset as string, 10) as number,
      orderBy: req.query.orderBy as string,
      isDESC: req.query.isDESC as string,
      limit: parseInt(req.query.limit as string, 10) as number,
    };

    const menuItems = await menuItemService.selectWithPagination(
      searchParameter
    );

    return res.json(menuItems);
  }

  async updateById(req: Request, res: Response) {
    const { description, price } = req.body;
    const { idUser } = req;

    await menuItemService.updateById(
      req.params.id,
      {
        description,
        price,
      },
      idUser
    );

    return res.status(204).end();
  }

  async block(req: Request, res: Response) {
    const { idUser } = req;

    await menuItemService.block(req.params.id, idUser);

    return res.status(204).end();
  }

  async unblock(req: Request, res: Response) {
    const { idUser } = req;

    await menuItemService.unblock(req.params.id, idUser);

    return res.status(204).end();
  }

  async delete(req: Request, res: Response) {
    const { idUser } = req;

    await menuItemService.delete(req.params.id, idUser);

    return res.status(204).end();
  }
}

export { MenuItemController };
