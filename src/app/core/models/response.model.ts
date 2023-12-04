export interface IResponse {
  id: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPageResponse<T> {
  statusCode: number;
  ok: boolean;
  data: {
    totalElements: number;
    totalPages: number;
    currentPage: number;
    results: T[];
  };
}
