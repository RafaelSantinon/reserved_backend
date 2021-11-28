import { Request, Response } from 'express';
import { FoodStoreTableService } from '@services/food-store-table';

const foodStoreTableService = new FoodStoreTableService();

class FoodStoreTableController {
  async create(req: Request, res: Response) {
    const { idFoodStore, number, seats } = req.body;

    await foodStoreTableService.create({
      idFoodStore,
      number,
      seats,
    });

    return res.status(204).end();
  }

  async selectById(req: Request, res: Response) {
    const foodStoreTable = await foodStoreTableService.selectById(
      req.params.id
    );

    return res.json(foodStoreTable);
  }

  async selectWithPagination(req: Request, res: Response) {
    const searchParameter = {
      idFoodStore: req.query.idFoodStore as string,
      offset: parseInt(req.query.offset as string, 10) as number,
      orderBy: req.query.orderBy as string,
      isDESC: req.query.isDESC as string,
      limit: parseInt(req.query.limit as string, 10) as number,
    };

    const foodStoreTables = await foodStoreTableService.selectWithPagination(
      searchParameter
    );

    return res.json(foodStoreTables);
  }

  async updateById(req: Request, res: Response) {
    const { seats } = req.body;
    const { idUser } = req;

    await foodStoreTableService.updateById(
      req.params.id,
      {
        seats,
      },
      idUser
    );

    return res.status(204).end();
  }

  async block(req: Request, res: Response) {
    const { idUser } = req;

    await foodStoreTableService.block(req.params.id, idUser);

    return res.status(204).end();
  }

  async unblock(req: Request, res: Response) {
    const { idUser } = req;

    await foodStoreTableService.unblock(req.params.id, idUser);

    return res.status(204).end();
  }

  async delete(req: Request, res: Response) {
    const { idUser } = req;

    await foodStoreTableService.delete(req.params.id, idUser);

    return res.status(204).end();
  }
}

export { FoodStoreTableController };
