export interface HookEventTypesFilter<THookEventType extends string> {
    applicationName?: string;
    name?: THookEventType;
    requirePayload?: boolean;
    fromDefaultRetryCount?: number;
    toDefaultRetryCount?: number;
    fromCreated?: Date;
    toCreated?: Date;
}