import { EntityRepository, Repository, getRepository } from 'typeorm';
import { CheckoutEntity } from '@entities/checkout';

import { ICheckoutPagination } from '../../utils/models/paginations';

@EntityRepository(CheckoutEntity)
class CheckoutRepository extends Repository<CheckoutEntity> {
  private CheckoutEntityRepository = getRepository(CheckoutEntity);

  async selectWithPagination(searchParameter: ICheckoutPagination) {
    const checkouts = await this.CheckoutEntityRepository.findAndCount({
      where: {
        ...(searchParameter.idUser && {
          idUser: searchParameter.idUser,
        }),
        ...(searchParameter.idFoodStore && {
          idFoodStore: searchParameter.idFoodStore,
        }),
        ...(searchParameter.idFoodStoreTable && {
          idFoodStoreTable: searchParameter.idFoodStoreTable,
        }),
        ...(searchParameter.status && {
          status: searchParameter.status,
        }),
        deletedAt: null,
      },
      relations: ['foodStoreTable', 'foodStore'],
      // ...(searchParameter.limit
      //   ? { take: searchParameter.limit }
      //   : { take: 10 }),
      skip: searchParameter.offset ? searchParameter.offset : 0,
      order: {
        [searchParameter.orderBy ? searchParameter.orderBy : 'createdAt']:
          searchParameter.isDESC ? 'ASC' : 'DESC',
      },
    });

    return checkouts;
  }
}

export { CheckoutRepository };
