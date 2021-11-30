/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export enum CheckoutStatus {
  CREATED = 1,
  APPROVED = 2,
  REPROVED = 3,
  PAYED = 4,
}

export enum CredentialType {
  PASSWORD = 1,
}

export enum FoodStoreStatus {
  APPROVED = 1,
  BLOCKED = 2,
}

export enum FoodStoreTableStatus {
  APPROVED = 1,
  BLOCKED = 2,
}

export enum MenuItemStatus {
  APPROVED = 1,
  BLOCKED = 2,
}

export enum MenuStatus {
  APPROVED = 1,
  BLOCKED = 2,
}

export enum MenuType {
  APPETIZER = 1,
  MAIN = 2,
  DESSERT = 3,
  DRINKS = 4,
}

export enum ProfileType {
  ADMIN = 1,
  FOOD_STORE_ADMIN = 2,
  TABLE_ADMIN = 3,
  USER = 4,
}

export enum UserStatus {
  APPROVED = 1,
  BLOCKED = 2,
}
