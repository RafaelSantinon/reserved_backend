import { EntityRepository, Repository, getRepository } from 'typeorm';
import { MenuEntity } from '@entities/menu';

import { IMenuPagination } from '../../utils/models/paginations';

@EntityRepository(MenuEntity)
class MenuRepository extends Repository<MenuEntity> {
  private menuEntityRepository = getRepository(MenuEntity);

  async selectWithPagination(searchParameter: IMenuPagination) {
    const menus = await this.menuEntityRepository.findAndCount({
      where: {
        ...(searchParameter.idFoodStore && {
          idFoodStore: searchParameter.idFoodStore,
        }),
        ...(searchParameter.type && {
          type: searchParameter.type,
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

    return menus;
  }
}

export { MenuRepository };
