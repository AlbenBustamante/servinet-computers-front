export interface IResponse {
  id: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IPageResponse<T extends IResponse> {
  statusCode: number;
  ok: boolean;
  data: {
    totalElements: number;
    totalPages: number;
    currentPage: number;
    results: T[];
  };
}
