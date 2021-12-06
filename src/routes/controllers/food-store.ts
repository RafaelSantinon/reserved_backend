import { Request, Response } from 'express';
import { FoodStoreService } from '@services/food-store';

const foodStoreService = new FoodStoreService();

class FoodStoreController {
  async create(req: Request, res: Response) {
    const { name, description, cnpj, latitude, longitude, openHours } =
      req.body;
    await foodStoreService.create({
      name,
      description,
      cnpj,
      pathImage: req.file.filename,
      latitude,
      longitude,
      openHours,
    });

    return res.status(204).end();
  }

  async selectById(req: Request, res: Response) {
    const foodStore = await foodStoreService.selectById(req.params.id);

    return res.json(foodStore);
  }

  async selectWithPagination(req: Request, res: Response) {
    const searchParameter = {
      name: req.query.name as string,
      cnpj: req.query.cnpj as string,
      offset: parseInt(req.query.offset as string, 10) as number,
      orderBy: req.query.orderBy as string,
      isDESC: req.query.isDESC as string,
      limit: parseInt(req.query.limit as string, 10) as number,
    };

    const foodStores = await foodStoreService.selectWithPagination(
      searchParameter
    );

    return res.json(foodStores);
  }

  async updateById(req: Request, res: Response) {
    const { name, description } = req.body;
    const { idUser } = req;

    await foodStoreService.updateById(
      req.params.id,
      {
        name,
        description,
      },
      idUser
    );

    return res.status(204).end();
  }

  async block(req: Request, res: Response) {
    const { idUser } = req;

    await foodStoreService.block(req.params.id, idUser);

    return res.status(204).end();
  }

  async unblock(req: Request, res: Response) {
    const { idUser } = req;

    await foodStoreService.unblock(req.params.id, idUser);

    return res.status(204).end();
  }

  async delete(req: Request, res: Response) {
    const { idUser } = req;

    await foodStoreService.delete(req.params.id, idUser);

    return res.status(204).end();
  }
}

export { FoodStoreController };
