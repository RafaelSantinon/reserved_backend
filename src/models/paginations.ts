export interface IPagination {
  offset?: number;
  orderBy?: string;
  isDESC?: string;
  limit?: number;
}

export interface IUserPagination extends IPagination {
  type?: string;
  name?: string;
  email?: string;
  accountTypeList?: string[];
}
