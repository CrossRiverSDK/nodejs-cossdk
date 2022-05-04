import { PolicyDeclineReasonType } from "./PolicyDeclineReasonType";

export interface DenialReason {
    declineReason: string;

    policy?: PolicyDeclineReasonType;
}
