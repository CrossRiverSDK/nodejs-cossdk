import { Address } from "./address";

export interface Employer {
    employerId?: string | null;
    name: string;
    addresses?: Array<Address> | null;
    phone?: string | null;
    email?: string | null;
}
