import { Request, Response } from 'express';
import { CheckoutService } from '@services/checkout';

const checkoutService = new CheckoutService();

class CheckoutController {
  async create(req: Request, res: Response) {
    const { idFoodStore, idFoodStoreTable, reserveName, tableNumber } =
      req.body;
    const { idUser } = req;

    await checkoutService.create({
      idUser,
      idFoodStore,
      idFoodStoreTable,
      reserveName,
      tableNumber,
    });

    return res.status(204).end();
  }

  async selectById(req: Request, res: Response) {
    const checkout = await checkoutService.selectById(req.params.id);

    return res.json(checkout);
  }

  async selectWithPagination(req: Request, res: Response) {
    const { idUser } = req;

    const searchParameter = {
      idUser,
      idFoodStore: req.query.idFoodStore as string,
      idFoodStoreTable: req.query.idFoodStoreTable as string,
      status: req.query.status as string,
      offset: parseInt(req.query.offset as string, 10) as number,
      orderBy: req.query.orderBy as string,
      isDESC: req.query.isDESC as string,
      limit: parseInt(req.query.limit as string, 10) as number,
    };

    const checkouts = await checkoutService.selectWithPagination(
      searchParameter
    );

    return res.json(checkouts);
  }

  async updateById(req: Request, res: Response) {
    const { status } = req.body;
    const { idUser } = req;

    await checkoutService.updateById(
      req.params.id,
      {
        status,
      },
      idUser
    );

    return res.status(204).end();
  }
}

export { CheckoutController };
