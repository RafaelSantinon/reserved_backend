import { EntityRepository, Repository } from 'typeorm';
import { UserCredential } from '@entities/UserCredential';

@EntityRepository(UserCredential)
class UserCredentialsRepositories extends Repository<UserCredential> {}

export { UserCredentialsRepositories };
