export interface IAuthenticate {
  email?: string;
  password?: string;
}

export interface ICheckout {
  idUser?: string;
  idFoodStore?: string;
  idFoodStoreTable?: string;
  status?: number;
  totalAmount?: number;
  reserveName?: string;
  tableNumber?: string;
}

export interface ICheckoutItem {
  idCheckout?: string;
  idMenuItem?: string;
  name?: string;
  unitPrice?: number;
  amount?: number;
}

export interface IFoodStore {
  name?: string;
  description?: string;
  cnpj?: string;
  pathImage?: string;
  latitude?: string;
  longitude?: string;
  openHours?: string;
}

export interface IFoodStoreTable {
  idFoodStore?: string;
  number?: number;
  seats?: number;
}

export interface IMenu {
  idFoodStore?: string;
  type?: number;
}

export interface IMenuItem {
  idMenu?: string;
  name?: string;
  description?: string;
  price?: number;
}

export interface IUserCredential {
  type?: number;
  idUser?: string;
  password?: string;
  expiresIn?: Date;
}

export interface IUser {
  type?: number;
  name?: string;
  email?: string;
  cellphone?: number;
  bornAt?: Date;
  password?: string;
}
