import { ApplicationDeniedRequest } from "./ApplicationDeniedRequest";
import { PreApprovalLoanRequest } from "./PreApprovalLoanRequest";

export interface DenyPreApprovalLoanRequest {
    preApprovalLoanRequest: PreApprovalLoanRequest;
    applicationDeniedRequest: ApplicationDeniedRequest;
}