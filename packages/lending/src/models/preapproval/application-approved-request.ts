import { Credit } from "./credit";
import { OFAC } from "./ofac";
import { Sell } from "./sell";
import { Servicer } from "./servicer";
import { TILA } from "./tila";

export interface ApplicationApprovedRequest {
    loanNumber?: string;
    noteDate?: Date;
    approvedLoanAmount?: number;
    loanAmount?: number;
    servicer?: Servicer;
    tila?: TILA;
    creditObject?: Credit;
    loanPurpose?: string;
    ofac?: OFAC;
    sell?: Sell;
}