import { CardCompanyEnum } from "./card-company-enum";
import { RailEnum } from "./rail-enum";

export interface PullSenderIssuerRail {
    externalSenderRailId: string;
    rail: RailEnum;
    priority: number;
    issuerId: CardCompanyEnum;
}
