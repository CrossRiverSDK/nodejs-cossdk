import { TinType } from "./tin-type";

export interface TaxNumber {
    tinType?: TinType;
    tinDetails?: string | null;
}
