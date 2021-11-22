import { getCustomRepository } from 'typeorm';
// import { hash } from 'bcryptjs';
import { UsersRepositories } from '@repositories/UsersRepositories';
import { User } from '@entities/User';

interface IUserRequest {
  type: number;
  name: string;
  email: string;
  cellphone: number;
  bornAt: Date;
}

class CreateUserService {
  async execute({ type, name, email, cellphone, bornAt }: IUserRequest) {
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

    // const passwordHash = await hash(password, 8);

    const user: User = usersRepository.create({
      type,
      name,
      email,
      cellphone,
      bornAt,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
