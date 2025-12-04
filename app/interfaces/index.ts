export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  meta: {

    timestamp: string;
    requestId: string;
  }
  error?: {

    code: string;
    details?: any[];
  }

}