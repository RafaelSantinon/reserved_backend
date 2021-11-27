export interface IAuthenticate {
  email?: string;
  password?: string;
}

export interface IFoodStore {
  name?: string;
  description?: string;
  cnpj?: string;
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
