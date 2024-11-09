export interface IResponse {
  id: number;
  enabled: boolean;
  createdBy: string;
  modifiedBy: string;
  createdDate: string;
  modifiedDate: string;
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
