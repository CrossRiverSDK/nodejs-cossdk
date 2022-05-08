import { ApplicationDenied, mapApplicationDenied } from "./application-denied";
import { Borrower, mapBorrower } from "./borrower";
import { BusinessResponse, mapBusinessResponse } from "./business-response";
import { CoBorrower, mapCoBorrower } from "./co-borrower";
import { Credit, mapCredit } from "./credit";
import { Employer } from "./employer";
import { Funding } from "./funding";
import { Investor } from "./investor";
import { IssuingBankId } from "./issuing-bank-id";
import { Merchant } from "./merchant";
import { OFAC } from "./ofac";
import { mapSell, Sell } from "./sell";
import { Servicer } from "./servicer";
import { StatusType } from "./status-type";
import { Submitter } from "./submitter";
import { mapTILA, TILA } from "./tila";

export interface PreApprovalLoanResponse {
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
    id?: string;
    status?: StatusType;
}

export function mapPreApprovalLoanResponse(obj: PreApprovalLoanResponse)
{
    if (obj.noteDate)
        obj.noteDate = new Date(obj.noteDate);

    obj.applicationDate = new Date(obj.applicationDate);

    if (obj.tila)
        mapTILA(obj.tila);

    obj.borrowers.forEach(b => mapBorrower(b));
    obj.borrowers.forEach(b => mapCoBorrower(b));

    if (obj.creditObject)
        mapCredit(obj.creditObject);

    if (obj.sell)
        mapSell(obj.sell);

    if (obj.business)
        mapBusinessResponse(obj.business);

    if (obj.applicationDenieds)
        obj.applicationDenieds.forEach(a => mapApplicationDenied(a));
}
