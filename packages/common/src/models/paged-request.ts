import { SortDirection } from "../enums/sort-direction";

export interface PagedRequest {
    sortPropertyName?: string;
    defaultSortingPropertyName?: string;
    sortDirection?: SortDirection;
    pageNumber?: number;
    pageSize?: number;
}