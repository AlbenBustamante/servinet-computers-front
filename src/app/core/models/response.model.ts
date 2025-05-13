export interface IResponse<ID> {
  id: ID;
  enabled: boolean;
  createdBy: string;
  modifiedBy: string;
  createdDate: string;
  modifiedDate: string;
}

export interface IPagination {
  size: number;
  totalElements: number;
  totalPages: number;
  currentPage: number;
}

export interface IPageResponse<T> {
  page: IPagination;
  content: T[];
}
