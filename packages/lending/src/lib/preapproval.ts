import { ApiConfiguration, ApiResponse, HttpMethod } from "@cossdk/common";
import { executeApi, executeGetApi } from "@cossdk/token-provider";
import { ApplicationApprovedRequest } from "../models/preapproval/ApplicationApprovedRequest";
import { ApplicationApprovedResponse, mapApplicationApprovedResponse } from "../models/preapproval/ApplicationApprovedResponse";
import { ApplicationDeniedRequest } from "../models/preapproval/ApplicationDeniedRequest";
import { ApprovePreApprovalLoanRequest } from "../models/preapproval/ApprovePreApprovalLoanRequest";
import { DenyPreApprovalLoanRequest } from "../models/preapproval/DenyPreApprovalLoanRequest";
import { mapPreApprovalDenyResponse, PreApprovalDenyResponse } from "../models/preapproval/PreApprovalDenyResponse";
import { mapPreApprovalLoanDenyResponse, PreApprovalLoanDenyResponse } from "../models/preapproval/PreApprovalLoanDenyResponse";
import { PreApprovalLoanRequest } from "../models/preapproval/PreApprovalLoanRequest";
import { mapPreApprovalLoanResponse, PreApprovalLoanResponse } from "../models/preapproval/PreApprovalLoanResponse";
import { LendingBase } from "./lending-base";

export class PreApproval extends LendingBase {
  
    constructor(config: ApiConfiguration) {
        super(config);
    }

    create(request: PreApprovalLoanRequest):Promise<ApiResponse<PreApprovalLoanResponse>>
    {
        this.validateInitialization();

        const mapper = (obj:ApiResponse<PreApprovalLoanResponse>) => {
            mapPreApprovalLoanResponse(obj.result);
        };

        return executeApi<PreApprovalLoanRequest, ApiResponse<PreApprovalLoanResponse>>(
            `${this.baseUrl}/Preapproval/v1/Applications`,
            HttpMethod.POST,
            request,
            undefined,
            mapper, 
            this.apiKey);
    }

    get(id: string):Promise<ApiResponse<PreApprovalLoanResponse>>
    {
        this.validateInitialization();

        const mapper = (obj:ApiResponse<PreApprovalLoanResponse>) => {
            mapPreApprovalLoanResponse(obj.result);
        };

        return executeGetApi<ApiResponse<PreApprovalLoanResponse>>(
            `${this.baseUrl}/Preapproval/v1/Applications/${id}`,
            undefined,
            mapper, 
            this.apiKey);
    }

    createAndApprove(request: ApprovePreApprovalLoanRequest):Promise<ApiResponse<PreApprovalLoanResponse>>
    {
        this.validateInitialization();

        const mapper = (obj:ApiResponse<PreApprovalLoanResponse>) => {
            mapPreApprovalLoanResponse(obj.result);
        };

        return executeApi<ApprovePreApprovalLoanRequest, ApiResponse<PreApprovalLoanResponse>>(
            `${this.baseUrl}/Preapproval/v1/Applications/Approve`,
            HttpMethod.POST,
            request,
            undefined,
            mapper, 
            this.apiKey);
    }

    approve(id: string, request: ApplicationApprovedRequest):Promise<ApiResponse<ApplicationApprovedResponse>>
    {
        this.validateInitialization();

        const mapper = (obj:ApiResponse<ApplicationApprovedResponse>) => {
            mapApplicationApprovedResponse(obj.result);
        };

        return executeApi<ApplicationApprovedRequest, ApiResponse<ApplicationApprovedResponse>>(
            `${this.baseUrl}/Preapproval/v1/Applications/${id}/Approve`,
            HttpMethod.PUT,
            request,
            undefined,
            mapper, 
            this.apiKey);
    }

    createAndDeny(request: DenyPreApprovalLoanRequest):Promise<ApiResponse<PreApprovalLoanDenyResponse>>
    {
        this.validateInitialization();

        const mapper = (obj:ApiResponse<PreApprovalLoanDenyResponse>) => {
            mapPreApprovalLoanDenyResponse(obj.result);
        };

        return executeApi<DenyPreApprovalLoanRequest, ApiResponse<PreApprovalLoanDenyResponse>>(
            `${this.baseUrl}/Preapproval/v1/Applications/Deny`,
            HttpMethod.POST,
            request,
            undefined,
            mapper, 
            this.apiKey);
    }

    deny(id: string, request: ApplicationDeniedRequest):Promise<ApiResponse<PreApprovalDenyResponse>>
    {
        this.validateInitialization();

        const mapper = (obj:ApiResponse<PreApprovalDenyResponse>) => {
            mapPreApprovalDenyResponse(obj.result);
        };

        return executeApi<ApplicationDeniedRequest, ApiResponse<PreApprovalDenyResponse>>(
            `${this.baseUrl}/Preapproval/v1/Applications/${id}/Deny`,
            HttpMethod.PUT,
            request,
            undefined,
            mapper, 
            this.apiKey);
    }
}