import { PullCard } from "./pull-card";
import { PullSender } from "./pull-sender";
import { PullSenderIssuerRail } from "./pull-sender-issuer-rail";

export interface PullTransactionRequest {
    transactionRequestId?: string;
    amount?: number;
    requesterMcc?: string | null;
    cvv?: string | null;
    threeDomainSecureEci?: number | null;
    threeDomainSecureUcaf?: string | null;
    threeDomainSecureXid?: string | null;
    sendingApplication: string;
    card: PullCard;
    sender: PullSender;
    senderIssuerRails: Array<PullSenderIssuerRail>;
}
