import { TimeSpan } from "@cossdk/common";
import { RegistrationOptions } from "./registration-options";

export interface RegistrationBase<THookEventType extends string> {
    id: string;
    applicationName?: string;
    hookName: THookEventType;
    hookCorrelationId?: string;
    extendedCorrelations?: Map<string, string>
    options: RegistrationOptions
    suspended?: boolean;
    retryCount?: number;
    retryDelay?: TimeSpan;
}

export interface Registration<THookEventType extends string> extends RegistrationBase<THookEventType> {
    created: Date;
    updated?: Date;
}