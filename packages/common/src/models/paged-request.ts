import { SortDirection } from "../enums/sort-direction";
import { PagedRequestThin } from "./paged-request-thin";

export interface PagedRequest extends PagedRequestThin {
    sortPropertyName?: string;
    defaultSortingPropertyName?: string;
    sortDirection?: SortDirection;
}