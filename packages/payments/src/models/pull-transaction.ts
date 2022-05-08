import { RailEnum } from "./rail-enum";
import { StatusEnum } from "./status-enum";

export interface PullTransaction {
    requesterId?: string;
    transactionRequestId: string;
    transactionRequestedAt?: Date;
    status?: StatusEnum;
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
    error?: string | null;
    transactionRequester?: string | null;
    transactionRequesterRole?: string | null;
    rail?: RailEnum;
    requestedAt?: Date;
    amount?: number;
    cardId?: string | null;
}

export function mapPullTransaction(obj: PullTransaction)
{
    if (obj.transactionRequestedAt)
        obj.transactionRequestedAt = new Date(obj.transactionRequestedAt);

    if (obj.actualTransactionAt)
        obj.actualTransactionAt = new Date(obj.actualTransactionAt);

    if (obj.requestedAt)
        obj.requestedAt = new Date(obj.requestedAt);
}
