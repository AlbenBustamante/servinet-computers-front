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
  CASH_REGISTER = 'CASH_REGISTER',
  SAFE = 'SAFE',
}

export enum ChangeLogAction {
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export enum ChangeLogType {
  TRANSACTION_DETAIL = 'TRANSACTION_DETAIL',
  EXPENSE = 'EXPENSE',
  CASH_TRANSFER = 'CASH_TRANSFER',
}

export enum BankDepositStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED',
}
