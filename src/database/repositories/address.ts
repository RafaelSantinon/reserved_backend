import { EntityRepository, Repository } from 'typeorm';
import { AddressEntity } from '@entities/address';

@EntityRepository(AddressEntity)
class AddressRepository extends Repository<AddressEntity> {}

export { AddressRepository };
