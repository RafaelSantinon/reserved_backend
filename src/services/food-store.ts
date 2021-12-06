import { DateTime } from 'luxon';
import { getCustomRepository } from 'typeorm';

import { FoodStoreRepository } from '@repositories/food-store';
import { ImagesRepository } from '@repositories/image';
import { AddressRepository } from '@repositories/address';

import { FoodStoreEntity } from '@entities/food-store';
import { ImagesEntity } from '@entities/images';
import { AddressEntity } from '@entities/address';
import {
  FoodStoreTableStatus,
  FoodStoreStatus,
} from '../utils/models/enumerators';

import { IFoodStore } from '../utils/models/interfaces';
import { IFoodStorePagination } from '../utils/models/paginations';
import { Errors } from '../utils/errors';

class FoodStoreService {
  async create({
    name,
    description,
    cnpj,
    pathImage,
    latitude,
    longitude,
    openHours,
  }: IFoodStore) {
    const foodStoreRepository = getCustomRepository(FoodStoreRepository);
    const imageRepository = getCustomRepository(ImagesRepository);
    const addressRepository = getCustomRepository(AddressRepository);

    const foodStoreAlreadyExists = await foodStoreRepository.findOne({
      name,
    });

    if (foodStoreAlreadyExists) {
      throw new Error(Errors.FOOD_STORE_ALREADY_EXISTS);
    }

    const foodStore: FoodStoreEntity = foodStoreRepository.create({
      name,
      description,
      cnpj,
      status: FoodStoreStatus.APPROVED,
      openHours,
    });

    await foodStoreRepository.save(foodStore);

    const foodStoreImage: ImagesEntity = imageRepository.create({
      idFoodStore: foodStore.id,
      path: pathImage,
    });

    await imageRepository.save(foodStoreImage);

    const foodStoreAddress: AddressEntity = addressRepository.create({
      idFoodStore: foodStore.id,
      latitude: Number(latitude),
      longitude: Number(longitude),
    });

    await addressRepository.save(foodStoreAddress);
  }

  async selectById(id: string) {
    const foodStoreRepository = getCustomRepository(FoodStoreRepository);

    const foodStore = await foodStoreRepository.findOne({
      where: {
        id,
      },
      relations: [
        'address',
        'image',
        'foodStoreTables',
        'foodStoreTables.checkouts',
      ],
    });

    let sum = 0;

    foodStore.foodStoreTables.forEach((table) => {
      if (table.status === FoodStoreTableStatus.RESERVED) sum += 1;
    });

    const situation = (sum * 100) / foodStore.foodStoreTables.length;

    if (!foodStore) throw new Error(Errors.FOOD_STORE_NOT_FOUND);

    return { foodStore, situation };
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

    const foodStore = await foodStoreRepository.findOne(foodStoreId);

    if (!foodStore) throw new Error(Errors.FOOD_STORE_NOT_FOUND);

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
