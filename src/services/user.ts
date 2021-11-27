import { DateTime } from 'luxon';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '@repositories/user';

import { UserCredentialService } from '@services/user-credential';

import { UserEntity } from '@entities/user';

import { IUser } from '../models/interfaces';
import { IUserPagination } from '../models/paginations';
import { CredentialType, ProfileType, UserStatus } from '../models/enumerators';
import { Errors } from '../utils/errors';

class UserService {
  async create({ type, name, email, cellphone, bornAt, password }: IUser) {
    const userRepository = getCustomRepository(UserRepository);

    if (!email) {
      throw new Error(Errors.EMAIL_INCORRECT);
    }

    const userAlreadyExists = await userRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new Error(Errors.USER_ALREADY_EXISTS);
    }

    const user: UserEntity = userRepository.create({
      type,
      name,
      email,
      cellphone,
      bornAt,
      status: UserStatus.APPROVED,
    });

    await userRepository.save(user);

    await UserCredentialService.create({
      idUser: user.id,
      type: CredentialType.PASSWORD,
      password,
      expiresIn: DateTime.local().plus({ years: 1 }).toJSDate(),
    });
  }

  async getMe(id: string) {
    const userRepository = getCustomRepository(UserRepository);

    return userRepository.findOne({
      where: {
        id,
      },
      relations: ['address'],
    });
  }

  async selectById(id: string) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(id);

    if (!user) throw new Error(Errors.USER_NOT_FOUND);

    return user;
  }

  async selectWithPagination(searchParameter: IUserPagination) {
    const userRepository = getCustomRepository(UserRepository);

    if (searchParameter.type) {
      searchParameter.accountTypeList = searchParameter.type.split(',');
    }

    const [rows, count] = await userRepository.selectWithPagination(
      searchParameter
    );

    if (count === 0) throw new Error(Errors.USER_NOT_FOUND);

    return { rows, count };
  }

  async updateById(userId: string, userData: IUser, actorId: string) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(userId);

    if (!user) throw new Error(Errors.USER_NOT_FOUND);

    const actor = await userRepository.findOne(actorId);

    if (actor.type === ProfileType.USER && actor.id !== user.id) {
      throw new Error(Errors.NOT_AUTHORIZED);
    }

    await userRepository.update(userId, {
      name: userData.name ? userData.name : user.name,
      email: userData.email ? userData.email : user.email,
      cellphone: userData.cellphone ? userData.cellphone : user.cellphone,
      updatedAt: DateTime.local().toJSDate(),
      updatedBy: actorId,
    });
  }

  async block(userId: string, actorId: string) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(userId);

    if (!user) throw new Error(Errors.USER_NOT_FOUND);

    await userRepository.update(userId, {
      status: UserStatus.BLOCKED,
      updatedAt: DateTime.local().toJSDate(),
      updatedBy: actorId,
    });
  }

  async unblock(userId: string, actorId: string) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(userId);

    if (!user) throw new Error(Errors.USER_NOT_FOUND);

    await userRepository.update(userId, {
      status: UserStatus.APPROVED,
      updatedAt: DateTime.local().toJSDate(),
      updatedBy: actorId,
    });
  }

  async delete(userId: string, actorId: string) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(userId);

    if (!user) throw new Error(Errors.USER_NOT_FOUND);

    const actor = await userRepository.findOne(actorId);

    if (actor.type === ProfileType.USER && actor.id !== user.id) {
      throw new Error(Errors.NOT_AUTHORIZED);
    }

    await userRepository.update(userId, {
      deletedAt: DateTime.local().toJSDate(),
      deletedBy: actorId,
    });
  }
}

export { UserService };
