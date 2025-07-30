export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SearchParams {
  q?: string;
  breedId?: string;
  limit?: number;
}
