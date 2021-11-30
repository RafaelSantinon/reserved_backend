import { DateTime } from 'luxon';
import { getCustomRepository } from 'typeorm';

import { CheckoutRepository } from '@repositories/checkout';

import { CheckoutEntity } from '@entities/checkout';

import { ICheckout } from '../utils/models/interfaces';
import { ICheckoutPagination } from '../utils/models/paginations';
import { CheckoutStatus } from '../utils/models/enumerators';
import { Errors } from '../utils/errors';

class CheckoutService {
  async create({ idUser, idFoodStore, idFoodStoreTable }: ICheckout) {
    const checkoutRepository = getCustomRepository(CheckoutRepository);

    const checkout: CheckoutEntity = checkoutRepository.create({
      idUser,
      idFoodStore,
      idFoodStoreTable,
      status: CheckoutStatus.CREATED,
    });

    await checkoutRepository.save(checkout);
  }

  async selectById(id: string) {
    const checkoutRepository = getCustomRepository(CheckoutRepository);

    const checkout = await checkoutRepository.findOne(id);

    if (!checkout) throw new Error(Errors.FOOD_STORE_NOT_FOUND);

    return checkout;
  }

  async selectWithPagination(searchParameter: ICheckoutPagination) {
    const checkoutRepository = getCustomRepository(CheckoutRepository);

    const [rows, count] = await checkoutRepository.selectWithPagination(
      searchParameter
    );

    if (count === 0) throw new Error(Errors.FOOD_STORE_NOT_FOUND);

    return { rows, count };
  }

  async updateById(
    checkoutId: string,
    checkoutData: ICheckout,
    actorId: string
  ) {
    const checkoutRepository = getCustomRepository(CheckoutRepository);

    const checkout = await checkoutRepository.findOne(checkoutId);

    if (!checkout) throw new Error(Errors.FOOD_STORE_NOT_FOUND);

    await checkoutRepository.update(checkoutId, {
      status: checkoutData.status ? checkoutData.status : checkout.status,
      totalAmount: checkoutData.totalAmount
        ? checkoutData.totalAmount
        : checkout.totalAmount,
      updatedAt: DateTime.local().toJSDate(),
      updatedBy: actorId,
    });
  }
}

export { CheckoutService };
