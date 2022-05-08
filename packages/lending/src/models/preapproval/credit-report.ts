import { AgencyType } from "./agency-type";
import { CreditRawReport } from "./credit-raw-report";
import { ReportType } from "./report-type";

export interface CreditReport {
    creditRawReport?: CreditRawReport;
    agency?: AgencyType;
    reportType?: ReportType;
    version: string;
}
