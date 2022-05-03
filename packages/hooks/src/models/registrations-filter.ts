import { HookType } from "../enums/hook-type";
import { PagedRequest } from "@cossdk/common";

export interface RegistrationsFilter<THookEventType extends string> extends PagedRequest {
    applicationName?: string;
    hookName?: THookEventType;
    hookServiceId?: string;
    hookCorrelationId?: string;
    type?: HookType;
    suspended?: boolean;
    fromCreated?: Date;
    toCreated?: Date;
}