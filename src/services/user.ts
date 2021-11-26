import { DateTime } from 'luxon';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '@repositories/user';

import { UserCredentialService } from '@services/user-credential';

import { UserEntity } from '@entities/user';

import { IUser } from '../models/interfaces';
import { CredentialType } from '../models/enumerators';
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
    });

    await userRepository.save(user);

    await UserCredentialService.create({
      idUser: user.id,
      type: CredentialType.PASSWORD,
      password,
      expiresIn: DateTime.local().plus({ years: 1 }).toJSDate(),
    });

    return user;
  }
}

export { UserService };
