import { HttpMethod } from "@cossdk/common";
import { AuthenticationType } from "../enums/authentication-type";
import { HookType } from "../enums/hook-type";

export interface EventDetailsFilter
{
    hookCorrelationId?: string;
    extendedCorrelations?: string;
    hookType?: HookType;
    messageType?: string;
    httpMethod?: HttpMethod;
    uri?: string;
    authenticationType?: AuthenticationType;
    authenticationOptions?: string;
    requestHeaders?: string;
    requestPayload?: string;
    responseHeaders?: string;
    responsePayload?: string;
    responseCode?: number;
    success?: boolean;
    clientException?: string;
    fromTimeSent?: Date;
    toTimeSent?: Date;
    requestedBy?: string;
    fromRequestedAt?: Date;
    toRequestedAt?: Date;
}