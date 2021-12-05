import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ObjectType,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';
import { FoodStoreEntity } from './food-store';

@Entity('images')
class ImagesEntity {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  idFoodStore: string;

  @Column()
  path: string;

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

  @OneToOne((): ObjectType<FoodStoreEntity> => FoodStoreEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idFoodStore', referencedColumnName: 'id' })
  public foodStore?: FoodStoreEntity;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { ImagesEntity };
