import { RailEnum } from "./rail-enum";

export interface CreditCardInfo {
    requestId?: string;
    cardToken?: string;
    firstName?: string;
    lastName?: string;
    ownerExternalId?: string;
    address1?: string;
    address2?: string;
    city?: string;
    zipCode?: string;
    isAuthorizationSucceeded?: boolean;
    state?: string;
    countryCode?: string;
    phoneNumber?: string;
    email?: string;
    expirationYear?: string;
    expirationMonth?: string;
    last4Digits?: string;
    cardCompany?: string;
    isActive?: boolean;
    deactivatedAt?: Date;
    addedOn?: Date;
    authorizationJson?: string;
    isFastFundsSupported?: boolean;
    rail?: RailEnum;
    pushEnabled?: boolean;
    pullEnabled?: boolean;
}

export function mapCreditCardInfo(obj: CreditCardInfo)
{
    if (obj.deactivatedAt)
        obj.deactivatedAt = new Date(obj.deactivatedAt);

    if (obj.addedOn)
        obj.addedOn = new Date(obj.addedOn);
}