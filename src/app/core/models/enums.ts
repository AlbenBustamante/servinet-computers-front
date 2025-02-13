export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum Role {
  CASHIER = 'CASHIER',
  SUPERVISOR = 'SUPERVISOR',
  ADMIN = 'ADMIN',
}

export enum CashRegisterStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  DISABLED = 'DISABLED',
}

export enum CashRegisterDetailStatus {
  WORKING = 'WORKING',
  RESTING = 'RESTING',
  CLOSED = 'CLOSED',
}

export enum TransactionType {
  NORMAL = 'NORMAL',
  RECEIPT = 'RECEIPT',
  WALLET = 'WALLET',
}

export enum TransactionDetailType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
}

export enum CashBoxType {
  CASH_REGISTER = 'CASH_TRANSFER',
  SAFE = 'SAFE',
}
