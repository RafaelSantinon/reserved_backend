import { DateTime } from 'luxon';
import { getCustomRepository } from 'typeorm';

import { FoodStoreTableRepository } from '@repositories/food-store-table';

import { FoodStoreTableEntity } from '@entities/food-store-table';

import { IFoodStoreTable } from '../utils/models/interfaces';
import { IFoodStoreTablePagination } from '../utils/models/paginations';
import { FoodStoreTableStatus } from '../utils/models/enumerators';
import { Errors } from '../utils/errors';

class FoodStoreTableService {
  async create({ idFoodStore, number, seats }: IFoodStoreTable) {
    const foodStoreTableRepository = getCustomRepository(
      FoodStoreTableRepository
    );

    const foodStoreTableAlreadyExists = await foodStoreTableRepository.findOne({
      idFoodStore,
      number,
    });

    if (foodStoreTableAlreadyExists) {
      throw new Error(Errors.FOOD_STORE_TABLE_ALREADY_EXISTS);
    }

    const foodStoreTable: FoodStoreTableEntity =
      foodStoreTableRepository.create({
        idFoodStore,
        number,
        seats,
        status: FoodStoreTableStatus.APPROVED,
      });

    await foodStoreTableRepository.save(foodStoreTable);
  }

  async selectById(id: string) {
    const foodStoreTableRepository = getCustomRepository(
      FoodStoreTableRepository
    );

    const foodStoreTable = await foodStoreTableRepository.findOne(id);

    if (!foodStoreTable) throw new Error(Errors.FOOD_STORE_TABLE_NOT_FOUND);

    return foodStoreTable;
  }

  async selectWithPagination(searchParameter: IFoodStoreTablePagination) {
    const foodStoreTableRepository = getCustomRepository(
      FoodStoreTableRepository
    );

    const [rows, count] = await foodStoreTableRepository.selectWithPagination(
      searchParameter
    );

    if (count === 0) throw new Error(Errors.FOOD_STORE_TABLE_NOT_FOUND);

    return { rows, count };
  }

  async updateById(
    foodStoreTableId: string,
    foodStoreTableData: IFoodStoreTable,
    actorId: string
  ) {
    const foodStoreTableRepository = getCustomRepository(
      FoodStoreTableRepository
    );

    const foodStoreTable = await foodStoreTableRepository.findOne(
      foodStoreTableId
    );

    if (!foodStoreTable) throw new Error(Errors.FOOD_STORE_TABLE_NOT_FOUND);

    await foodStoreTableRepository.update(foodStoreTableId, {
      seats: foodStoreTableData.seats
        ? foodStoreTableData.seats
        : foodStoreTable.seats,
      updatedAt: DateTime.local().toJSDate(),
      updatedBy: actorId,
    });
  }

  async block(foodStoreTableId: string, actorId: string) {
    const foodStoreTableRepository = getCustomRepository(
      FoodStoreTableRepository
    );

    const foodStoreTable = await foodStoreTableRepository.findOne(
      foodStoreTableId
    );

    if (!foodStoreTable) throw new Error(Errors.FOOD_STORE_TABLE_NOT_FOUND);

    await foodStoreTableRepository.update(foodStoreTableId, {
      status: FoodStoreTableStatus.BLOCKED,
      updatedAt: DateTime.local().toJSDate(),
      updatedBy: actorId,
    });
  }

  async unblock(foodStoreTableId: string, actorId: string) {
    const foodStoreTableRepository = getCustomRepository(
      FoodStoreTableRepository
    );

    const foodStoreTable = await foodStoreTableRepository.findOne(
      foodStoreTableId
    );

    if (!foodStoreTable) throw new Error(Errors.FOOD_STORE_TABLE_NOT_FOUND);

    await foodStoreTableRepository.update(foodStoreTableId, {
      status: FoodStoreTableStatus.APPROVED,
      updatedAt: DateTime.local().toJSDate(),
      updatedBy: actorId,
    });
  }

  async delete(foodStoreTableId: string, actorId: string) {
    const foodStoreTableRepository = getCustomRepository(
      FoodStoreTableRepository
    );

    const foodStoreTable = await foodStoreTableRepository.findOne(
      foodStoreTableId
    );

    if (!foodStoreTable) throw new Error(Errors.FOOD_STORE_TABLE_NOT_FOUND);

    await foodStoreTableRepository.update(foodStoreTableId, {
      deletedAt: DateTime.local().toJSDate(),
      deletedBy: actorId,
    });
  }
}

export { FoodStoreTableService };
