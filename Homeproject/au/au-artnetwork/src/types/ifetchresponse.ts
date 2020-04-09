export interface IFetchResponse<TData> {
  statusCode: number;
  errorMessage?: string; // can be undefined
  errors?: {[propertyName: string]: string[]}
  data?: TData
}
