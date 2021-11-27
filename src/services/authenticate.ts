import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { UserRepository } from '@repositories/user';
import { UserCredentialRepository } from '@repositories/user-credential';

import { IAuthenticate } from '../models/interfaces';

class AuthenticateService {
  async login({ email, password }: IAuthenticate) {
    const userCredentialRepository = getCustomRepository(
      UserCredentialRepository
    );
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({
      email,
    });

    if (!user) throw new Error('Email or Password incorrect');

    const credential = await userCredentialRepository.findOne({
      idUser: user.id,
    });

    const passwordMatch = await compare(password, credential.credential);

    if (!passwordMatch) throw new Error('Email or Password incorrect');

    const token = sign(
      {
        email: user.email,
      },
      '208784feb4163b36d766e7cbf8e42206',
      {
        subject: user.id,
        expiresIn: '1d',
      }
    );

    return token;
  }
}

export { AuthenticateService };
