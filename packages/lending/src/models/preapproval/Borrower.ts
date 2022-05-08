import { Address } from "./address";
import { CIP } from "./cip";
import { ResidencyType } from "./residency-type";

export interface Borrower {
    cip: CIP;
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
}

export function mapBorrower(obj: Borrower)
{
    obj.dob = new Date(obj.dob);
}