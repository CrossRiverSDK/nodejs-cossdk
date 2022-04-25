export interface PagedResults<T>
{
    results: T[];
    pageNumber: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}