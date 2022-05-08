import { MerchantStatementDescriptionEnum } from "./merchant-statement-description-enum";

export interface PullSender {
    senderId: string;
    city: string;
    countryCode: string;
    state: string;
    zipCode: string;
    address: string;
    name: string;
    county?: string | null;
    statementDescription: MerchantStatementDescriptionEnum;
    userName: string;
    requesterRole: string;
    requesterName?: string | null;
}
