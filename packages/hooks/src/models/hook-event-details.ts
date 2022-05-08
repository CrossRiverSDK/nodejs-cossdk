import { HttpMethod } from "@cossdk/common";
import { AuthenticationType } from "../enums/authentication-type";
import { HookType } from "../enums/hook-type";

export interface HookEventDetails
{
    id: string;
    eventId: string;
    messageId: string;
    registrationId: string;
    applicationName: string;
    hookName: string;
    hookServiceId?: string;
    hookCorrelationId?: string;
    extendedCorrelations?: string;
    hookType: HookType;
    messageEndpoint?: string;
    messageType?: string;
    httpMethod?: HttpMethod;
    uri?: string;
    authenticationType: AuthenticationType;
    authenticationOptions?: string;
    requestHeaders?: string;
    requestPayload?: string;
    responseHeaders?: string;
    responsePayload?: string;
    responseCode?: number;
    success: boolean;
    clientException?: string;
    timeSent: Date;
    created: Date;
    requestedAt?: Date;
    requestedBy?: string;
}
