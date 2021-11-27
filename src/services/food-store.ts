import { DateTime } from 'luxon';
import { getCustomRepository } from 'typeorm';
import { FoodStoreRepository } from '@repositories/food-store';

import { FoodStoreEntity } from '@entities/food-store';

import { UserRepository } from '@repositories/user';
import { IFoodStore } from '../models/interfaces';
import { IFoodStorePagination } from '../models/paginations';
import { ProfileType, FoodStoreStatus } from '../models/enumerators';
import { Errors } from '../utils/errors';

class FoodStoreService {
  async create({ name, description, cnpj }: IFoodStore) {
    const foodStoreRepository = getCustomRepository(FoodStoreRepository);

    const foodStoreAlreadyExists = await foodStoreRepository.findOne({
      name,
    });

    if (foodStoreAlreadyExists) {
      throw new Error(Errors.USER_ALREADY_EXISTS);
    }

    const foodStore: FoodStoreEntity = foodStoreRepository.create({
      name,
      description,
      cnpj,
      status: FoodStoreStatus.APPROVED,
    });

    await foodStoreRepository.save(foodStore);
  }

  async selectById(id: string) {
    const foodStoreRepository = getCustomRepository(FoodStoreRepository);

    const foodStore = await foodStoreRepository.findOne(id);

    if (!foodStore) throw new Error(Errors.FOOD_STORE_NOT_FOUND);

    return foodStore;
  }

  async selectWithPagination(searchParameter: IFoodStorePagination) {
    const foodStoreRepository = getCustomRepository(FoodStoreRepository);

    const [rows, count] = await foodStoreRepository.selectWithPagination(
      searchParameter
    );

    if (count === 0) throw new Error(Errors.FOOD_STORE_NOT_FOUND);

    return { rows, count };
  }

  async updateById(
    foodStoreId: string,
    foodStoreData: IFoodStore,
    actorId: string
  ) {
    const foodStoreRepository = getCustomRepository(FoodStoreRepository);
    const userRepository = getCustomRepository(UserRepository);

    const foodStore = await foodStoreRepository.findOne(foodStoreId);

    if (!foodStore) throw new Error(Errors.FOOD_STORE_NOT_FOUND);

    const actor = await userRepository.findOne(actorId);

    if (
      actor.type === ProfileType.FOOD_STORE_ADMIN &&
      actor.id !== foodStore.id
    ) {
      throw new Error(Errors.NOT_AUTHORIZED);
    }

    await foodStoreRepository.update(foodStoreId, {
      name: foodStoreData.name ? foodStoreData.name : foodStore.name,
      description: foodStoreData.description
        ? foodStoreData.description
        : foodStore.description,
      updatedAt: DateTime.local().toJSDate(),
      updatedBy: actorId,
    });
  }

  async block(foodStoreId: string, actorId: string) {
    const foodStoreRepository = getCustomRepository(FoodStoreRepository);

    const foodStore = await foodStoreRepository.findOne(foodStoreId);

    if (!foodStore) throw new Error(Errors.FOOD_STORE_NOT_FOUND);

    await foodStoreRepository.update(foodStoreId, {
      status: FoodStoreStatus.BLOCKED,
      updatedAt: DateTime.local().toJSDate(),
      updatedBy: actorId,
    });
  }

  async unblock(foodStoreId: string, actorId: string) {
    const foodStoreRepository = getCustomRepository(FoodStoreRepository);

    const foodStore = await foodStoreRepository.findOne(foodStoreId);

    if (!foodStore) throw new Error(Errors.FOOD_STORE_NOT_FOUND);

    await foodStoreRepository.update(foodStoreId, {
      status: FoodStoreStatus.APPROVED,
      updatedAt: DateTime.local().toJSDate(),
      updatedBy: actorId,
    });
  }

  async delete(foodStoreId: string, actorId: string) {
    const foodStoreRepository = getCustomRepository(FoodStoreRepository);

    const foodStore = await foodStoreRepository.findOne(foodStoreId);

    if (!foodStore) throw new Error(Errors.FOOD_STORE_NOT_FOUND);

    await foodStoreRepository.update(foodStoreId, {
      deletedAt: DateTime.local().toJSDate(),
      deletedBy: actorId,
    });
  }
}

export { FoodStoreService };
