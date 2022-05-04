import { Address } from "./Address";
import { CIP } from "./CIP";
import { CreditBureauScore, mapCreditBureauScore } from "./CreditBureauScore";
import { ResidencyType } from "./ResidencyType";

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
