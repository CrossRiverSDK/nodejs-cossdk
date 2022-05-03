import { PagedRequest } from "@cossdk/common";

export interface RegistrationsEventsFilter extends PagedRequest {
    id?: string;
    payload?: string;
    sent?: boolean;
    fromCreated?: Date;
    toCreated?: Date;
}