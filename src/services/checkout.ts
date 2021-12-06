import { DateTime } from 'luxon';
import { getCustomRepository } from 'typeorm';

import { CheckoutRepository } from '@repositories/checkout';
import { FoodStoreTableRepository } from '@repositories/food-store-table';
import { UserRepository } from '@repositories/user';

import { CheckoutEntity } from '@entities/checkout';
import {
  FoodStoreTableStatus,
  CheckoutStatus,
} from '../utils/models/enumerators';

import { ICheckout } from '../utils/models/interfaces';
import { ICheckoutPagination } from '../utils/models/paginations';
import { Errors } from '../utils/errors';

class CheckoutService {
  async create({
    idUser,
    idFoodStore,
    idFoodStoreTable,
    reserveName,
    tableNumber,
  }: ICheckout) {
    const checkoutRepository = getCustomRepository(CheckoutRepository);
    const foodStoreTableRepository = getCustomRepository(
      FoodStoreTableRepository
    );

    const checkout: CheckoutEntity = checkoutRepository.create({
      idUser,
      idFoodStore,
      idFoodStoreTable,
      status: CheckoutStatus.CREATED,
      reserveName,
      tableNumber,
    });

    await checkoutRepository.save(checkout);

    await foodStoreTableRepository.update(idFoodStoreTable, {
      status: FoodStoreTableStatus.PENDING_CONFIRM,
    });
  }

  async selectById(id: string) {
    const checkoutRepository = getCustomRepository(CheckoutRepository);

    const checkout = await checkoutRepository.findOne(id);

    if (!checkout) throw new Error(Errors.FOOD_STORE_NOT_FOUND);

    return checkout;
  }

  async selectWithPagination(searchParameter: ICheckoutPagination) {
    const checkoutRepository = getCustomRepository(CheckoutRepository);
    const userRepository = getCustomRepository(UserRepository);
    if (searchParameter.idUser) {
      const user = await userRepository.findOne(searchParameter.idUser);

      if (user && user.type !== 4) searchParameter.idUser = null;
    }

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
