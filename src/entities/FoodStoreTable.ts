import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('food-store-tables')
class FoodStoreTable {
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

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { FoodStoreTable };
