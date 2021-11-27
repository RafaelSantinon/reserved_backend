export interface IPagination {
  offset?: number;
  orderBy?: string;
  isDESC?: string;
  limit?: number;
}

export interface IFoodStorePagination extends IPagination {
  name?: string;
  cnpj?: string;
}

export interface IMenuPagination extends IPagination {
  idFoodStore?: string;
  type?: string;
}

export interface IUserPagination extends IPagination {
  type?: string;
  name?: string;
  email?: string;
  accountTypeList?: string[];
}
