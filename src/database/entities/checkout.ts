import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  ObjectType,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

import { FoodStoreTableEntity } from './food-store-table';
import { FoodStoreEntity } from './food-store';

@Entity('checkouts')
class CheckoutEntity {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  idUser: string;

  @Column()
  idFoodStore: string;

  @Column()
  status: number;

  @Column()
  totalAmount: number;

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
  idFoodStoreTable: string;

  @Column()
  reserveName: string;

  @Column()
  tableNumber: string;

  @ManyToOne((): ObjectType<FoodStoreTableEntity> => FoodStoreTableEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idFoodStoreTable', referencedColumnName: 'id' })
  public foodStoreTable?: FoodStoreTableEntity;

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

export { CheckoutEntity };
