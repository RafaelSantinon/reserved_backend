import { EntityRepository, Repository, getRepository } from 'typeorm';
import { CheckoutItemEntity } from '@entities/checkout-item';

import { ICheckoutItemPagination } from '../../utils/models/paginations';

@EntityRepository(CheckoutItemEntity)
class CheckoutItemRepository extends Repository<CheckoutItemEntity> {
  private CheckoutItemEntityRepository = getRepository(CheckoutItemEntity);

  async selectWithPagination(searchParameter: ICheckoutItemPagination) {
    const checkoutItens = await this.CheckoutItemEntityRepository.findAndCount({
      where: {
        ...(searchParameter.idCheckout && {
          idCheckout: searchParameter.idCheckout,
        }),
        deletedAt: null,
      },
      // ...(searchParameter.limit
      //   ? { take: searchParameter.limit }
      //   : { take: 10 }),
      skip: searchParameter.offset ? searchParameter.offset : 0,
      order: {
        [searchParameter.orderBy ? searchParameter.orderBy : 'createdAt']:
          searchParameter.isDESC ? 'ASC' : 'DESC',
      },
    });

    return checkoutItens;
  }
}

export { CheckoutItemRepository };
