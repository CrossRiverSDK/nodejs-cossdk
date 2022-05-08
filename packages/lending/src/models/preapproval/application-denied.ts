import { DenialReason } from "./denial-reason";

export interface ApplicationDenied {
    denialReasons: Array<DenialReason>;
    denialDate: Date;
    adverseActionNoticeDate: Date;
    counterofferDate?: Date;
    noticeOfIncompleteness?: Date;
    initialFraudAlert?: boolean;
    extendedFraudAlert?: boolean;
    addressDiscrepancyFlag?: boolean;
    creditFreeze?: boolean;
    exceptionFlag?: boolean;
    exceptionNotes?: string | null;
    investorDecisioned: boolean;
    underwriterNotes?: string | null;
    preApprovalLoanId?: string;
}

export function mapApplicationDenied(obj: ApplicationDenied)
{
    obj.denialDate = new Date(obj.denialDate);
    obj.adverseActionNoticeDate = new Date(obj.adverseActionNoticeDate);

    if (obj.counterofferDate)
        obj.counterofferDate = new Date(obj.counterofferDate);
        
    if (obj.noticeOfIncompleteness)
        obj.counterofferDate = new Date(obj.noticeOfIncompleteness);
}