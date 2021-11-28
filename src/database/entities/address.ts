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
import { UserEntity } from './user';

@Entity('addresses')
class AddressEntity {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  idUser: string;

  @Column()
  idFoodStore: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  district: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  complement: string;

  @Column()
  cep: string;

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

  @OneToOne((): ObjectType<UserEntity> => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idUser', referencedColumnName: 'id' })
  public user?: UserEntity;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { AddressEntity };
