import { TinType } from "./TinType";

export interface TaxNumber {
    tinType?: TinType;
    tinDetails?: string | null;
}
