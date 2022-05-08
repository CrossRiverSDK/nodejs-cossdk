import { TimeSpan } from "@cossdk/common";

export interface HookEventType<THookEventType extends string>
{
    applicationName: string;
    name: THookEventType;
    requirePayload: boolean;
    payloadType: string;
    defaultRetryCount: number;
    active: boolean;
    created: Date;
    defaultRetryDelay: TimeSpan;
}