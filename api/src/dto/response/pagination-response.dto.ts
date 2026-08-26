export class PaginationResponseDto<T> {
  results: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;

  constructor(
    data: T[],
    totalItems: number,
    currentPage: number,
    limit: number,
  ) {
    this.results = data;
    this.total = totalItems;
    this.page = currentPage;
    this.pageSize = data.length;
    this.totalPages = Math.ceil(totalItems / limit);
  }
}
