import { DateTime } from 'luxon';
import { getCustomRepository } from 'typeorm';

import { MenuRepository } from '@repositories/menu';

import { MenuEntity } from '@entities/menu';

import { IMenu } from '../models/interfaces';
import { IMenuPagination } from '../models/paginations';
import { MenuStatus } from '../models/enumerators';
import { Errors } from '../utils/errors';

class MenuService {
  async create({ idFoodStore, type }: IMenu) {
    const menuRepository = getCustomRepository(MenuRepository);

    const menuAlreadyExists = await menuRepository.findOne({
      where: {
        idFoodStore,
        type,
      },
    });

    if (menuAlreadyExists) {
      throw new Error(Errors.MENU_ALREADY_EXISTS);
    }

    const menu: MenuEntity = menuRepository.create({
      idFoodStore,
      type,
      status: MenuStatus.APPROVED,
    });

    await menuRepository.save(menu);
  }

  async selectById(id: string) {
    const menuRepository = getCustomRepository(MenuRepository);

    const menu = await menuRepository.findOne(id);

    if (!menu) throw new Error(Errors.MENU_NOT_FOUND);

    return menu;
  }

  async selectWithPagination(searchParameter: IMenuPagination) {
    const menuRepository = getCustomRepository(MenuRepository);

    const [rows, count] = await menuRepository.selectWithPagination(
      searchParameter
    );

    if (count === 0) throw new Error(Errors.MENU_NOT_FOUND);

    return { rows, count };
  }

  async block(menuId: string, actorId: string) {
    const menuRepository = getCustomRepository(MenuRepository);

    const menu = await menuRepository.findOne(menuId);

    if (!menu) throw new Error(Errors.MENU_NOT_FOUND);

    await menuRepository.update(menuId, {
      status: MenuStatus.BLOCKED,
      updatedAt: DateTime.local().toJSDate(),
      updatedBy: actorId,
    });
  }

  async unblock(menuId: string, actorId: string) {
    const menuRepository = getCustomRepository(MenuRepository);

    const menu = await menuRepository.findOne(menuId);

    if (!menu) throw new Error(Errors.MENU_NOT_FOUND);

    await menuRepository.update(menuId, {
      status: MenuStatus.APPROVED,
      updatedAt: DateTime.local().toJSDate(),
      updatedBy: actorId,
    });
  }

  async delete(menuId: string, actorId: string) {
    const menuRepository = getCustomRepository(MenuRepository);

    const menu = await menuRepository.findOne(menuId);

    if (!menu) throw new Error(Errors.MENU_NOT_FOUND);

    await menuRepository.update(menuId, {
      deletedAt: DateTime.local().toJSDate(),
      deletedBy: actorId,
    });
  }
}

export { MenuService };
