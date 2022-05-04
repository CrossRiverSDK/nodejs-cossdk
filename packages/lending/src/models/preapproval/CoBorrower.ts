import { Address } from "./Address";
import { CIP } from "./CIP";
import { ResidencyType } from "./ResidencyType";

export interface CoBorrower {
    cip?: CIP;
    addresses?: Array<Address> | null;
    dob?: Date;
    ssn?: string | null;
    citizenship?: string | null;
    residencyType?: ResidencyType;
    firstName: string;
    lastName: string;
    middleInitial?: string | null;
    prefix?: string | null;
    suffix?: string | null;
    phone?: string | null;
    email?: string | null;
}

export function mapCoBorrower(obj: CoBorrower)
{
    if (obj.dob)
        obj.dob = new Date(obj.dob);
}