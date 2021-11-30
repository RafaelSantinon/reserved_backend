export interface IPagination {
  offset?: number;
  orderBy?: string;
  isDESC?: string;
  limit?: number;
}

export interface ICheckoutPagination extends IPagination {
  idUser?: string;
  idFoodStore?: string;
  idFoodStoreTable?: string;
  status?: string;
}

export interface IFoodStorePagination extends IPagination {
  name?: string;
  cnpj?: string;
}

export interface IFoodStoreTablePagination extends IPagination {
  idFoodStore?: string;
}

export interface IMenuItemPagination extends IPagination {
  idMenu?: string;
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
