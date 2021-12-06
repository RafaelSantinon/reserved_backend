import { EntityRepository, Repository, getRepository, ILike } from 'typeorm';
import { FoodStoreEntity } from '@entities/food-store';

import { IFoodStorePagination } from '../../utils/models/paginations';

@EntityRepository(FoodStoreEntity)
class FoodStoreRepository extends Repository<FoodStoreEntity> {
  private foodStoreEntityRepository = getRepository(FoodStoreEntity);

  async selectWithPagination(searchParameter: IFoodStorePagination) {
    const foodStores = await this.foodStoreEntityRepository.findAndCount({
      where: {
        ...(searchParameter.name && {
          name: ILike(`%${searchParameter.name}%`),
        }),
        ...(searchParameter.cnpj && {
          cnpj: ILike(`%${searchParameter.cnpj}%`),
        }),
        deletedAt: null,
      },
      relations: ['address', 'image', 'foodStoreTables'],
      // ...(searchParameter.limit
      //   ? { take: searchParameter.limit }
      //   : { take: 10 }),
      skip: searchParameter.offset ? searchParameter.offset : 0,
      order: {
        [searchParameter.orderBy ? searchParameter.orderBy : 'createdAt']:
          searchParameter.isDESC ? 'ASC' : 'DESC',
      },
    });

    return foodStores;
  }
}

export { FoodStoreRepository };
