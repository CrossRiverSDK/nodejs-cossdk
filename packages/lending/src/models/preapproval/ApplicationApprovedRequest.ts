import { Credit } from "./Credit";
import { OFAC } from "./OFAC";
import { Sell } from "./Sell";
import { Servicer } from "./Servicer";
import { TILA } from "./TILA";

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