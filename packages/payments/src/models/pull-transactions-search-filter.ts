import { PagedRequest } from "@cossdk/common";
import { RailEnum } from "./rail-enum";
import { StatusEnum } from "./status-enum";

export interface PullTransactionsSearchFilter extends PagedRequest {
    cardToken?: string;
    statusEnum?: StatusEnum;
    requesterIds?: Array<string>;
    fromDate?: Date;
    toDate?: Date;
    transactionRequestId?: string;
    fromAmount?: number;
    toAmount?: number;
    transactionResponse?: string;
    rail?: RailEnum;
    paymentSent?: boolean;
    responseReceived?: boolean;
    responseCode?: string;
    traceNumber?: string;
    network?: string;
}