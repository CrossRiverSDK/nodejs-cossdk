export interface HookEventTypesFilter {
    applicationName?: string;
    name?: string;
    requirePayload?: boolean;
    fromDefaultRetryCount?: number;
    toDefaultRetryCount?: number;
    fromCreated?: Date;
    toCreated?: Date;
}