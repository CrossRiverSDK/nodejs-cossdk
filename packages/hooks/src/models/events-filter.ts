import { HookType } from "../enums/hook-type";
import { RegistrationsEventsFilter } from "./registrations-events-filter";

export interface EventsFilter extends RegistrationsEventsFilter
{
    registrationId?: string;
    fuzzySearch?: string;
    applicationName?: string;
    hookName?: string;
    hookServiceId?: string;
    hookCorrelationId?: string;
    type?: HookType;
    suspended?: boolean;
}