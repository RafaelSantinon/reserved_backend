import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ObjectType,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';
import { ImagesEntity } from './images';

@Entity('food-stores')
class FoodStoreEntity {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  cnpj: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  createdBy: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  updatedBy: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  deletedBy: string;

  @Column()
  status: number;

  @Column()
  openHours: string;

  @OneToOne(
    (): ObjectType<ImagesEntity> => ImagesEntity,
    (image: ImagesEntity): FoodStoreEntity => image.foodStore
  )
  image?: ImagesEntity;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { FoodStoreEntity };
