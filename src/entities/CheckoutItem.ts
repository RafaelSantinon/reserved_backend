import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('checkout-itens')
class CheckoutItem {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  idCheckout: string;

  @Column()
  idMenuItem: string;

  @Column()
  name: string;

  @Column()
  unitPrice: number;

  @Column()
  amount: number;

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

export { CheckoutItem };
