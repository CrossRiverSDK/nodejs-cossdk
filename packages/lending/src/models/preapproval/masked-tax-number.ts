import { TinType } from "./tin-type";

export interface MaskedTaxNumber {
    tinType?: TinType;
    readonly tinDetails?: string | null;
}
