import { DenialReason } from "./DenialReason";

export interface ApplicationDeniedRequest {
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
}

export function mapApplicationDeniedRequest(obj: ApplicationDeniedRequest)
{
    obj.denialDate = new Date(obj.denialDate);
    obj.adverseActionNoticeDate = new Date(obj.adverseActionNoticeDate);

    if (obj.counterofferDate)
        obj.counterofferDate = new Date(obj.counterofferDate);

    if (obj.noticeOfIncompleteness)
        obj.denialDate = new Date(obj.noticeOfIncompleteness);
}