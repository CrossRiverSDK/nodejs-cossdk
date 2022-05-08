import { PagedRequestThin } from "@cossdk/common";
import { StatusEnum } from "./status-enum";

export interface PushTransactionsSearchFilter extends PagedRequestThin {
    cardToken?: string;
    statusEnum?: StatusEnum;
    sourceSenderId?: string;
    fromDate?: Date;
    toDate?: Date;
}