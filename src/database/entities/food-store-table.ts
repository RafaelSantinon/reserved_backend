import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  ObjectType,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

import { CheckoutEntity } from './checkout';
import { FoodStoreEntity } from './food-store';

@Entity('food-store-tables')
class FoodStoreTableEntity {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  idFoodStore: string;

  @Column()
  number: number;

  @Column()
  seats: number;

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

  @OneToMany(
    (): ObjectType<CheckoutEntity> => CheckoutEntity,
    (checkouts: CheckoutEntity): FoodStoreTableEntity =>
      // eslint-disable-next-line implicit-arrow-linebreak
      checkouts.foodStoreTable
  )
  checkouts?: CheckoutEntity;

  @ManyToOne((): ObjectType<FoodStoreEntity> => FoodStoreEntity, {
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

export { FoodStoreTableEntity };
