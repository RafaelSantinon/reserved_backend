import {
  EntityRepository,
  Repository,
  getRepository,
  ILike,
  In,
} from 'typeorm';
import { UserEntity } from '@entities/user';

import { IUserPagination } from '../models/paginations';

@EntityRepository(UserEntity)
class UserRepository extends Repository<UserEntity> {
  private userEntityRepository = getRepository(UserEntity);

  async selectWithPagination(searchParameter: IUserPagination) {
    const users = await this.userEntityRepository.findAndCount({
      where: {
        ...(searchParameter.accountTypeList && {
          type: In(searchParameter.accountTypeList),
        }),
        ...(searchParameter.name && {
          name: ILike(`%${searchParameter.name}%`),
        }),
        ...(searchParameter.email && {
          email: ILike(`%${searchParameter.email}%`),
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

    return users;
  }
}

export { UserRepository };
