import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ObjectType,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

import { ImagesEntity } from './images';
import { AddressEntity } from './address';
import { CheckoutEntity } from './checkout';
import { FoodStoreTableEntity } from './food-store-table';

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

  @OneToOne(
    (): ObjectType<AddressEntity> => AddressEntity,
    (address: AddressEntity): FoodStoreEntity => address.foodStore
  )
  address?: AddressEntity;

  @OneToMany(
    (): ObjectType<CheckoutEntity> => CheckoutEntity,
    (checkouts: CheckoutEntity): FoodStoreEntity =>
      // eslint-disable-next-line implicit-arrow-linebreak
      checkouts.foodStore
  )
  checkouts?: CheckoutEntity;

  @OneToMany(
    (): ObjectType<FoodStoreTableEntity> => FoodStoreTableEntity,
    (foodStoreTables: FoodStoreTableEntity): FoodStoreEntity =>
      // eslint-disable-next-line implicit-arrow-linebreak
      foodStoreTables.foodStore
  )
  foodStoreTables?: FoodStoreTableEntity[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { FoodStoreEntity };
