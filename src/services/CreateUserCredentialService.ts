import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { UserCredentialsRepositories } from '@repositories/UserCredentialsRepositories';
import { UserCredential } from '@entities/UserCredential';

interface IUserCredentialRequest {
  type: number;
  idUser: string;
  password: string;
  expiresIn: Date;
}

class CreateUserCredentialService {
  static async execute({
    idUser,
    type,
    password,
    expiresIn,
  }: IUserCredentialRequest) {
    const userCredentialsRepository = getCustomRepository(
      UserCredentialsRepositories
    );

    const passwordHash = await hash(password, 8);

    const credential: UserCredential = userCredentialsRepository.create({
      idUser,
      type,
      credential: passwordHash,
      expiresIn,
    });

    await userCredentialsRepository.save(credential);
  }
}

export { CreateUserCredentialService };
