import { HookType } from "../enums/hook-type";
import { SortDirection } from "../enums/sort-direction";

export class TypesFilter {
    applicationName?: string;
    name?: string;
    requirePayload?: boolean;
    fromDefaultRetryCount?: number;
    toDefaultRetryCount?: number;
    fromCreated?: Date;
    toCreated?: Date;
}