import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('food-stores')
class FoodStore {
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

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { FoodStore };
