import { AssetClassType } from "./asset-class-type";
import { CreditBureauScore, mapCreditBureauScore } from "./credit-bureau-score";
import { CreditCustomField } from "./credit-custom-field";
import { CreditReport } from "./credit-report";
import { Employer } from "./employer";

export interface Credit {
    priorLoanFlag: boolean;
    creditBureauScores?: Array<CreditBureauScore> | null;
    regBDecisionDate: Date;
    assetClass: AssetClassType;
    loanPurpose: string;
    homeownerFlag?: boolean;
    openCreditLines?: number;
    annualIncome?: number;
    creditInquiries12months?: number;
    dqPast24months?: number;
    publicRecordsOnFile?: number;
    employmentLength?: number;
    debtUtilization?: number;
    totalRevolvingDebt?: number;
    accountsOpenedPast24months?: number;
    collectionsExcludingMedical?: number;
    monthsSinceLastRecord?: number;
    employer?: Employer;
    dti: number;
    preDTIExMortgage?: number;
    preDTIInMortgage?: number;
    preDTIDate?: Date;
    postDTIExMortgage?: number;
    postDTIInMortgage?: number;
    postDTIDate?: Date;
    mlaflag?: boolean;
    mapr: number;
    creditReport?: CreditReport;
    netDisposableIncome?: number;
    paymentsHistory?: string | null;
    tradelines?: number;
    assets?: string | null;
    creditScore?: number;
    creditModel: string;
    creditModelVersion: string;
    creditModelProvider: string;
    marketingChannel: string;
    inquiriesintheLast6months?: number;
    ltiRatio?: number;
    oldestTradeMonth?: number;
    balanceofPublicRecords?: number;
    bankruptcyStatus?: number;
    enrolledInCccs?: boolean;
    totalBalanceTradelines?: number;
    totalCreditLinesClosed24Months?: number;
    totalCreditLinesOpen12Months?: number;
    requestedLoanAmount: number;
    taxLiens?: number;
    totalOpenBankCard?: number;
    creditPolicyVersion: string;
    customFields?: Array<CreditCustomField> | null;
}

export function mapCredit(obj: Credit)
{
    if (obj.creditBureauScores)
        obj.creditBureauScores.forEach(s => mapCreditBureauScore(s));

    obj.regBDecisionDate = new Date(obj.regBDecisionDate);

    if (obj.preDTIDate)
        obj.preDTIDate = new Date(obj.preDTIDate);

    if (obj.postDTIDate)
        obj.postDTIDate = new Date(obj.postDTIDate);
}