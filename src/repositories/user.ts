import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '@entities/user';

@EntityRepository(UserEntity)
class UserRepository extends Repository<UserEntity> {}

export { UserRepository };
