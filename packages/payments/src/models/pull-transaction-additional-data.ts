import { PullSenderIssuerRail } from "./pull-sender-issuer-rail";

export interface PullTransactionAdditionalData {
    threeDomainSecureEci?: number | null;
    threeDomainSecureUcaf?: string | null;
    threeDomainSecureXid?: string | null;
    senderIssuerRails?: Array<PullSenderIssuerRail> | null;
}
