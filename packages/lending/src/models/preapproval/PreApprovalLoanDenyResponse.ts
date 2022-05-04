import { ApplicationDenied, mapApplicationDenied } from "./ApplicationDenied";
import { Borrower, mapBorrower } from "./Borrower";
import { BusinessResponse, mapBusinessResponse } from "./BusinessResponse";
import { CoBorrower, mapCoBorrower } from "./CoBorrower";
import { Credit, mapCredit } from "./Credit";
import { Employer } from "./Employer";
import { Funding } from "./Funding";
import { Investor } from "./Investor";
import { IssuingBankId } from "./IssuingBankId";
import { Merchant } from "./Merchant";
import { OFAC } from "./OFAC";
import { mapSell, Sell } from "./Sell";
import { Servicer } from "./Servicer";
import { StatusType } from "./StatusType";
import { Submitter } from "./Submitter";
import { mapTILA, TILA } from "./TILA";

export interface PreApprovalLoanDenyResponse {
    id?: string;
    status?: StatusType;
    applicationId: string;
    loanNumber?: string | null;
    issuingBankId: IssuingBankId;
    platform: string;
    loanAmount?: number;
    noteDate?: Date;
    approvedLoanAmount?: number;
    applicationDate: Date;
    servicer?: Servicer;
    program: string;
    tila?: TILA;
    borrowers: Array<Borrower>;
    coBorrowers?: Array<CoBorrower> | null;
    creditObject?: Credit;
    employers?: Array<Employer> | null;
    merchant?: Merchant;
    sell?: Sell;
    business?: BusinessResponse;
    submitter: Submitter;
    funding?: Funding;
    investor?: Investor;
    ofac?: OFAC;
    loanPurpose?: string | null;
    applicationDenieds?: Array<ApplicationDenied> | null;
}

export function mapPreApprovalLoanDenyResponse(obj: PreApprovalLoanDenyResponse)
{
    if (obj.noteDate)
        obj.noteDate = new Date(obj.noteDate);

    obj.applicationDate = new Date(obj.applicationDate);

    if (obj.tila)
        mapTILA(obj.tila);
    
    obj.borrowers.forEach(b => mapBorrower(b));
    if (obj.coBorrowers)
        obj.coBorrowers.forEach(b => mapCoBorrower(b));

    if (obj.creditObject)
        mapCredit(obj.creditObject);

    if (obj.sell)
        mapSell(obj.sell);

    if (obj.business)
        mapBusinessResponse(obj.business);

    if (obj.applicationDenieds)
        obj.applicationDenieds.forEach(a => mapApplicationDenied(a));
}
