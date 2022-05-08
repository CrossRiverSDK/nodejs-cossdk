import { Address } from "./address";
import { CIP } from "./cip";
import { CreditBureauScore, mapCreditBureauScore } from "./credit-bureau-score";
import { ResidencyType } from "./residency-type";

export interface BusinessOwner {
    cip?: CIP;
    addresses?: Array<Address> | null;
    dob: Date;
    ssn: string;
    citizenship?: string | null;
    residencyType?: ResidencyType;
    firstName: string;
    lastName: string;
    middleInitial?: string | null;
    prefix?: string | null;
    suffix?: string | null;
    phone: string;
    email: string;
    ownerShipPer: number;
    ownerCreditBureauScore: CreditBureauScore;
}

export function mapBusinessOwner(obj: BusinessOwner)
{
    obj.dob = new Date(obj.dob);
    mapCreditBureauScore(obj.ownerCreditBureauScore);
}
