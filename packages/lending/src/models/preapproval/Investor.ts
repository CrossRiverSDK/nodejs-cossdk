import { Address } from "./address";

export interface Investor {
    investorId?: string | null;
    name?: string | null;
    addresses?: Array<Address> | null;
    phone?: string | null;
    email?: string | null;
}