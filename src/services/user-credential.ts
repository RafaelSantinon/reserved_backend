import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import { UserCredentialRepository } from '@repositories/user-credential';

import { UserCredentialEntity } from '@entities/user-credential';

import { IUserCredential } from '../models/interfaces';

class UserCredentialService {
  static async create({ idUser, type, password, expiresIn }: IUserCredential) {
    const userCredentialRepository = getCustomRepository(
      UserCredentialRepository
    );

    const passwordHash = await hash(password, 8);

    const credential: UserCredentialEntity = userCredentialRepository.create({
      idUser,
      type,
      credential: passwordHash,
      expiresIn,
    });

    await userCredentialRepository.save(credential);
  }
}

export { UserCredentialService };
