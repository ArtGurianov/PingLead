export interface AppResponse {
  success: boolean;
  data: string | number | boolean | null;
  errorMessage: string | null;
}
