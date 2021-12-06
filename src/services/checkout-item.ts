import { getCustomRepository } from 'typeorm';

import { CheckoutItemRepository } from '@repositories/checkout-item';

import { CheckoutItemEntity } from '@entities/checkout-item';

import { ICheckoutItem } from '../utils/models/interfaces';
import { ICheckoutItemPagination } from '../utils/models/paginations';
import { Errors } from '../utils/errors';

class CheckoutItemService {
  async create({
    idCheckout,
    idMenuItem,
    name,
    unitPrice,
    amount,
  }: ICheckoutItem) {
    const checkoutItemRepository = getCustomRepository(CheckoutItemRepository);

    const checkoutItem: CheckoutItemEntity = checkoutItemRepository.create({
      idCheckout,
      idMenuItem,
      name,
      unitPrice,
      amount,
    });

    await checkoutItemRepository.save(checkoutItem);
  }

  async selectWithPagination(searchParameter: ICheckoutItemPagination) {
    const checkoutItemRepository = getCustomRepository(CheckoutItemRepository);

    const [rows, count] = await checkoutItemRepository.selectWithPagination(
      searchParameter
    );

    if (count === 0) throw new Error(Errors.GENERIC_ERROR);

    return { rows, count };
  }
}

export { CheckoutItemService };
