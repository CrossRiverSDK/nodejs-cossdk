import { HookType } from "../enums/hook-type";
import { PagedRequest } from "@cossdk/common";

export interface RegistrationsFilter extends PagedRequest {
    applicationName?: string;
    hookName?: string;
    hookServiceId?: string;
    hookCorrelationId?: string;
    type?: HookType;
    suspended?: boolean;
    fromCreated?: Date;
    toCreated?: Date;
}