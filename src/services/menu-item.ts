import { DateTime } from 'luxon';
import { getCustomRepository } from 'typeorm';

import { MenuItemRepository } from '@repositories/menu-item';

import { MenuItemEntity } from '@entities/menu-item';

import { IMenuItem } from '../models/interfaces';
import { IMenuItemPagination } from '../models/paginations';
import { MenuItemStatus } from '../models/enumerators';
import { Errors } from '../utils/errors';

class MenuItemService {
  async create({ idMenu, name, description, price }: IMenuItem) {
    const menuItemRepository = getCustomRepository(MenuItemRepository);

    const menuItemAlreadyExists = await menuItemRepository.findOne({
      name,
    });

    if (menuItemAlreadyExists) {
      throw new Error(Errors.MENU_ITEM_ALREADY_EXISTS);
    }

    const menuItem: MenuItemEntity = menuItemRepository.create({
      idMenu,
      name,
      description,
      price,
      status: MenuItemStatus.APPROVED,
    });

    await menuItemRepository.save(menuItem);
  }

  async selectById(id: string) {
    const menuItemRepository = getCustomRepository(MenuItemRepository);

    const menuItem = await menuItemRepository.findOne(id);

    if (!menuItem) throw new Error(Errors.MENU_ITEM_NOT_FOUND);

    return menuItem;
  }

  async selectWithPagination(searchParameter: IMenuItemPagination) {
    const menuItemRepository = getCustomRepository(MenuItemRepository);

    const [rows, count] = await menuItemRepository.selectWithPagination(
      searchParameter
    );

    if (count === 0) throw new Error(Errors.MENU_ITEM_NOT_FOUND);

    return { rows, count };
  }

  async updateById(
    menuItemId: string,
    menuItemData: IMenuItem,
    actorId: string
  ) {
    const menuItemRepository = getCustomRepository(MenuItemRepository);

    const menuItem = await menuItemRepository.findOne(menuItemId);

    if (!menuItem) throw new Error(Errors.MENU_ITEM_NOT_FOUND);

    await menuItemRepository.update(menuItemId, {
      description: menuItemData.description
        ? menuItemData.description
        : menuItem.description,
      price: menuItemData.price ? menuItemData.price : menuItem.price,
      updatedAt: DateTime.local().toJSDate(),
      updatedBy: actorId,
    });
  }

  async block(menuItemId: string, actorId: string) {
    const menuItemRepository = getCustomRepository(MenuItemRepository);

    const menuItem = await menuItemRepository.findOne(menuItemId);

    if (!menuItem) throw new Error(Errors.MENU_ITEM_NOT_FOUND);

    await menuItemRepository.update(menuItemId, {
      status: MenuItemStatus.BLOCKED,
      updatedAt: DateTime.local().toJSDate(),
      updatedBy: actorId,
    });
  }

  async unblock(menuItemId: string, actorId: string) {
    const menuItemRepository = getCustomRepository(MenuItemRepository);

    const menuItem = await menuItemRepository.findOne(menuItemId);

    if (!menuItem) throw new Error(Errors.MENU_ITEM_NOT_FOUND);

    await menuItemRepository.update(menuItemId, {
      status: MenuItemStatus.APPROVED,
      updatedAt: DateTime.local().toJSDate(),
      updatedBy: actorId,
    });
  }

  async delete(menuItemId: string, actorId: string) {
    const menuItemRepository = getCustomRepository(MenuItemRepository);

    const menuItem = await menuItemRepository.findOne(menuItemId);

    if (!menuItem) throw new Error(Errors.MENU_ITEM_NOT_FOUND);

    await menuItemRepository.update(menuItemId, {
      deletedAt: DateTime.local().toJSDate(),
      deletedBy: actorId,
    });
  }
}

export { MenuItemService };
