import { ApplicationDeniedRequest } from "./application-denied-request";
import { PreApprovalLoanRequest } from "./pre-approval-loan-request";

export interface DenyPreApprovalLoanRequest {
    preApprovalLoanRequest: PreApprovalLoanRequest;
    applicationDeniedRequest: ApplicationDeniedRequest;
}