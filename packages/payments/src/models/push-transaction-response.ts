import { RailEnum } from "./rail-enum";
import { StatusEnum } from "./status-enum";

export interface PushTransactionResponse {
    transactionRequestId?: string;
    amount?: number;
    transactionRequestedAt?: Date;
    transactionStatus?: StatusEnum;
    errorDescription?: string;
    creditCardId?: string;
    railId?: RailEnum;
    network?: string;
    retrievalReferenceId?: string;
    actualTransactionDoneAt?: Date;
    paymentSent?: boolean;
    requestApproved?: boolean;
    responseReceived?: boolean;
    responseCode?: string;
    responseDescription?: string;
    traceNumber?: string;
    error?: string;
    transactionRequestBatchId?: string;
    sourceSenderName?: string;
    sourceMcc?: string;
}

export function mapPushTransactionResponse(obj: PushTransactionResponse)
{
    if (obj.transactionRequestedAt)
        obj.transactionRequestedAt = new Date(obj.transactionRequestedAt);

    if (obj.actualTransactionDoneAt)
        obj.actualTransactionDoneAt = new Date(obj.actualTransactionDoneAt);
}