import { EntityRepository, Repository, getRepository } from 'typeorm';
import { FoodStoreTableEntity } from '@entities/food-store-table';

import { IFoodStoreTablePagination } from '../models/paginations';

@EntityRepository(FoodStoreTableEntity)
class FoodStoreTableRepository extends Repository<FoodStoreTableEntity> {
  private foodStoreTableEntityRepository = getRepository(FoodStoreTableEntity);

  async selectWithPagination(searchParameter: IFoodStoreTablePagination) {
    const foodStoreTables =
      await this.foodStoreTableEntityRepository.findAndCount({
        where: {
          ...(searchParameter.idFoodStore && {
            idFoodStore: searchParameter.idFoodStore,
          }),
          deletedAt: null,
        },
        ...(searchParameter.limit
          ? { take: searchParameter.limit }
          : { take: 10 }),
        skip: searchParameter.offset ? searchParameter.offset : 0,
        order: {
          [searchParameter.orderBy ? searchParameter.orderBy : 'createdAt']:
            searchParameter.isDESC ? 'DESC' : 'ASC',
        },
      });

    return foodStoreTables;
  }
}

export { FoodStoreTableRepository };
