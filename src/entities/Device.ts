import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('devices')
class Device {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  idUser: string;

  @Column()
  cellphone: number;

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

export { Device };
