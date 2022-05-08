import { CardCompanyEnum } from "./card-company-enum";

export interface PullCard {
    cardId: string;
    creditCardNumber: string;
    firstName: string;
    lastName: string;
    cardCompanyId: CardCompanyEnum;
    expirationYear: number;
    expirationMonth: number;
    cvv?: string | null;
}