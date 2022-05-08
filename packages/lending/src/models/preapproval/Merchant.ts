import { Address } from "./address";

export interface Merchant {
    merchantId?: string | null;
    fee?: number;
    addresses?: Array<Address> | null;
    name?: string | null;
    phone?: string | null;
    email?: string | null;
}
