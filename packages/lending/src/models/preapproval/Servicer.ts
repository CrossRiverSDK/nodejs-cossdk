import { Address } from "./Address";

export interface Servicer {
    name: string;
    addresses?: Array<Address> | null;
    phone?: string | null;
    email?: string | null;
}
