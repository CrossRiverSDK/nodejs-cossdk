import { TimeSpan } from "@cossdk/common";

export interface Type
{
    applicationName: string;
    name: string;
    requirePayload: boolean;
    payloadType: string;
    defaultRetryCount: number;
    active: boolean;
    created: Date;
    defaultRetryDelay: TimeSpan;
}