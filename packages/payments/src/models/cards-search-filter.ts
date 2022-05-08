import { PagedRequestThin } from "@cossdk/common";
import { CardCompanyEnum } from "./card-company-enum";

export interface CardsSearchFilter extends PagedRequestThin {
    dateAddedFrom?: Date;
    dateAddedTo?: Date;
    sourceSenderId?: string;
    firstName?: string;
    lastName?: string;
    isActive?: boolean;
    cardCompany?: CardCompanyEnum;
}