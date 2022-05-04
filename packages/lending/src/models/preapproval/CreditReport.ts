import { AgencyType } from "./AgencyType";
import { CreditRawReport } from "./CreditRawReport";
import { ReportType } from "./ReportType";

export interface CreditReport {
    creditRawReport?: CreditRawReport;
    agency?: AgencyType;
    reportType?: ReportType;
    version: string;
}
