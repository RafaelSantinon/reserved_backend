import { EntityRepository, Repository, getRepository } from 'typeorm';
import { MenuItemEntity } from '@entities/menu-item';

import { IMenuItemPagination } from '../models/paginations';

@EntityRepository(MenuItemEntity)
class MenuItemRepository extends Repository<MenuItemEntity> {
  private menuItemEntityRepository = getRepository(MenuItemEntity);

  async selectWithPagination(searchParameter: IMenuItemPagination) {
    const menuItems = await this.menuItemEntityRepository.findAndCount({
      where: {
        ...(searchParameter.idMenu && {
          idMenu: searchParameter.idMenu,
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

    return menuItems;
  }
}

export { MenuItemRepository };
