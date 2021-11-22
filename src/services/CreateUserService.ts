import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '@repositories/UsersRepositories';

import { CreateUserCredentialService } from '@services/CreateUserCredentialService';

import { User } from '@entities/User';

interface IUserRequest {
  type: number;
  name: string;
  email: string;
  cellphone: number;
  bornAt: Date;
  password: string;
}

class CreateUserService {
  async execute({
    type,
    name,
    email,
    cellphone,
    bornAt,
    password,
  }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    if (!email) {
      throw new Error('Email incorrect');
    }

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const user: User = usersRepository.create({
      type,
      name,
      email,
      cellphone,
      bornAt,
    });

    await usersRepository.save(user);

    await CreateUserCredentialService.execute({
      idUser: user.id,
      type: 1,
      password,
      expiresIn: new Date(2022 - 11 - 22),
    });

    return user;
  }
}

export { CreateUserService };
