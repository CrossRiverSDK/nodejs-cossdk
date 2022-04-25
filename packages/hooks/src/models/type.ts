import { TimeSpan } from "@cossdk/common";

export interface Type
{
    applicationName: string;
    name: string;
    requirePayload: boolean;
    payloadType: string;
    defaultRetryCount: number;
    defaultRetryDelay: TimeSpan;
    active: boolean;
    created: Date;
}