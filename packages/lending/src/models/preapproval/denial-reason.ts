import { PolicyDeclineReasonType } from "./policy-decline-reason-type";

export interface DenialReason {
    declineReason: string;

    policy?: PolicyDeclineReasonType;
}
