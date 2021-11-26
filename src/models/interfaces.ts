export interface IAuthenticate {
  email: string;
  password: string;
}

export interface IUserCredential {
  type: number;
  idUser: string;
  password: string;
  expiresIn: Date;
}

export interface IUser {
  type: number;
  name: string;
  email: string;
  cellphone: number;
  bornAt: Date;
  password: string;
}
