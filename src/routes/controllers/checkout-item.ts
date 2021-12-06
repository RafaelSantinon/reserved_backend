import { Request, Response } from 'express';
import { CheckoutItemService } from '@services/checkout-item';

const checkoutItemService = new CheckoutItemService();

class CheckoutItemController {
  async create(req: Request, res: Response) {
    const { idCheckout, idMenuItem, name, unitPrice, amount } = req.body;

    await checkoutItemService.create({
      idCheckout,
      idMenuItem,
      name,
      unitPrice,
      amount,
    });

    return res.status(204).end();
  }

  async selectWithPagination(req: Request, res: Response) {
    const searchParameter = {
      idCheckout: req.query.idCheckout as string,
      offset: parseInt(req.query.offset as string, 10) as number,
      orderBy: req.query.orderBy as string,
      isDESC: req.query.isDESC as string,
      limit: parseInt(req.query.limit as string, 10) as number,
    };

    const checkouts = await checkoutItemService.selectWithPagination(
      searchParameter
    );

    return res.json(checkouts);
  }
}

export { CheckoutItemController };
