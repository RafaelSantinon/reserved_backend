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
import { AddressEntity } from './address';

@Entity('users')
class UserEntity {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  type: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cellphone: number;

  @Column()
  bornAt: Date;

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

  @OneToOne(
    (): ObjectType<AddressEntity> => AddressEntity,
    (address: AddressEntity): UserEntity => address.user
  )
  address?: AddressEntity;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { UserEntity };
