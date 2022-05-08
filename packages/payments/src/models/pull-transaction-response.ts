import { RailEnum } from "./rail-enum";
import { StatusEnum } from "./status-enum";

export interface PullTransactionResponse {
    requesterId?: string;
    transactionRequestId?: string;
    transactionRequestedAt?: Date;
    transactionStatus?: StatusEnum;
    actualTransactionAt?: Date | null;
    requestApproved?: boolean;
    network?: string | null;
    responseReceived?: boolean;
    responseCode?: string | null;
    responseDescription?: string | null;
    traceNumber?: string | null;
    transactionResponse?: string | null;
    retrievalReferenceId?: string | null;
    rejectedDescription?: string | null;
    errorDescription?: string | null;
    error?: string | null;
    transactionRequester?: string | null;
    transactionRequesterRole?: string | null;
    railId?: RailEnum;
    amount?: number | null;
    creditCardId?: string | null;
    requesterName?: string | null;
    requesterMcc?: string | null;
}

export function mapPullTransactionResponse(obj: PullTransactionResponse)
{
    if (obj.transactionRequestedAt)
        obj.transactionRequestedAt = new Date(obj.transactionRequestedAt);

    if (obj.actualTransactionAt)
        obj.actualTransactionAt = new Date(obj.actualTransactionAt);
}