export interface PaginationResponseDto<T> {
  results: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
