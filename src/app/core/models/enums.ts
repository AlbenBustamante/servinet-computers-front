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
  RESTING = 'RESTING',
  OCCUPIED = 'OCCUPIED',
  DISABLED = 'DISABLED',
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
