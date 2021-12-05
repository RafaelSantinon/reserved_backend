import { EntityRepository, Repository } from 'typeorm';
import { ImagesEntity } from '@entities/images';

@EntityRepository(ImagesEntity)
class ImagesRepository extends Repository<ImagesEntity> {}

export { ImagesRepository };
