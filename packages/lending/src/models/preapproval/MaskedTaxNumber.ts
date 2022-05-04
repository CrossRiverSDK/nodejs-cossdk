import { TinType } from "./TinType";

export interface MaskedTaxNumber {
    tinType?: TinType;
    readonly tinDetails?: string | null;
}
