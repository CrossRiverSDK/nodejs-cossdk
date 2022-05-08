import { Investor } from "./investor";
import { LoanType } from "./loan-type";

export interface Sell {
    loanType: LoanType;
    investors?: Array<Investor> | null;
    subpoolId?: string | null;
    estimatedPurchaseDate: Date;
}

export function mapSell(obj: Sell)
{
    obj.estimatedPurchaseDate = new Date(obj.estimatedPurchaseDate);
}
