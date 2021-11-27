import { EntityRepository, Repository } from 'typeorm';
import { UserCredentialEntity } from '@entities/user-credential';

@EntityRepository(UserCredentialEntity)
class UserCredentialRepository extends Repository<UserCredentialEntity> {}

export { UserCredentialRepository };
