export interface FilterOption {
  page?: string;
  limit?: string;
  sort?: string;
}

export interface ParamsRequest {
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface BaseResponse<T> {
  message?: string;
  success?: boolean;
  status?: string;
  data: T;
}

export interface PagingResponse<T> {
  items: T[];
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}
