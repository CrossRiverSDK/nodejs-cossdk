import { HookType } from "../enums/hook-type";
import { SortDirection } from "../enums/sort-direction";

export class RegistrationsFilter {
    applicationName?: string;
    hookName?: string;
    hookServiceId?: string;
    hookCorrelationId?: string;
    type?: HookType;
    suspended?: boolean;
    fromCreated?: Date;
    toCreated?: Date;
    sortPropertyName?: string;
    defaultSortingPropertyName?: string;
    sortDirection?: SortDirection;
    pageNumber?: number;
    pageSize?: number;
}