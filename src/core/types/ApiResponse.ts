// Define the ApiResponseData interface for successful responses
export interface ApiResponseData<T> {
  success: true;
  data: T; // Replace 'any' with the specific data type you expect in the response
}

// Define the ApiResponseError interface for error responses
export interface ApiResponseError<E = string> {
  success: false;
  error: E; // Use a string or a custom error type depending on your needs
}

// Create the ApiResponse interface using the discriminated union
export type ApiResponse<T, E> = ApiResponseData<T> | ApiResponseError<E>;
