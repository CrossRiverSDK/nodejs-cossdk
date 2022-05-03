import { TimeSpan } from "@cossdk/common";
import { RegistrationOptions } from "./registration-options";

export interface RegistrationBase {
    id: string;
    applicationName: string;
    hookName: string;
    hookCorrelationId?: string;
    extendedCorrelations?: Map<string, string>
    options: RegistrationOptions
    suspended?: boolean;
    retryCount?: number;
    retryDelay?: TimeSpan;
}

export interface Registration extends RegistrationBase {
    created: Date;
    updated?: Date;
}