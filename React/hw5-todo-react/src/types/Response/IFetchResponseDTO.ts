export interface IFetchResponseDTO<TData> {
    status: string;
    errors: string[];
    data: TData | null;
}
