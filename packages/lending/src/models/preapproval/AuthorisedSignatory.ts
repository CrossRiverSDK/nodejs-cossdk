import { Address } from "./Address";
import { ResidencyType } from "./ResidencyType";

export interface AuthorisedSignatory {
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

export function mapAuthorisedSignatory(obj: AuthorisedSignatory)
{
    obj.dob = new Date(obj.dob);
}
