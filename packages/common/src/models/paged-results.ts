export class PagedResults<T>
{
    constructor()
    {
        this.results = new Array<T>();
        this.pageNumber = NaN;
        this.pageSize = NaN;
        this.hasPreviousPage = false;
        this.hasNextPage = false;
    }

    results: T[];
    pageNumber: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}