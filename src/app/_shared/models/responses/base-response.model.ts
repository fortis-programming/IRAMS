export interface BaseResponse<T> {
    data: T,
    errorCode?: string;
    message?: string;
  }