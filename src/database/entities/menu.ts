import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('menus')
class MenuEntity {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  idFoodStore: string;

  @Column()
  type: number;

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

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { MenuEntity };
