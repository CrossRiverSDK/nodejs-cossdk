import { Credit, mapCredit } from "./credit";
import { OFAC } from "./ofac";
import { mapSell, Sell } from "./sell";
import { Servicer } from "./servicer";
import { mapTILA, TILA } from "./tila";

export interface ApplicationApprovedResponse {
    loanNumber?: string;
    noteDate?: Date;
    approvedLoanAmount?: number;
    loanAmount?: number;
    servicer?: Servicer;
    tila?: TILA;
    creditObject?: Credit;
    loanPurpose?: string | null;
    ofac?: OFAC;
    sell?: Sell;
    id?: string;
}

export function mapApplicationApprovedResponse(obj: ApplicationApprovedResponse)
{
    if (obj.noteDate)
        obj.noteDate = new Date(obj.noteDate);

    if (obj.tila)
        mapTILA(obj.tila);

    if (obj.creditObject)
        mapCredit(obj.creditObject);

    if (obj.sell)
        mapSell(obj.sell);
}
