
/** Matches your backend ApiResponse<T> */
export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}

/** Matches your backend ApiError */
export interface ApiError {
  statusCode: number;
  message: string;
  data: null;
  error: unknown[];
}
