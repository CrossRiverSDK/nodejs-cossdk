import { ApplicationDeniedRequest, mapApplicationDeniedRequest } from "./application-denied-request";

export interface PreApprovalDenyResponse {
    id?: string;
    applicationDenied?: ApplicationDeniedRequest;
}

export function mapPreApprovalDenyResponse(obj: PreApprovalDenyResponse)
{
    if (obj.applicationDenied)
        mapApplicationDeniedRequest(obj.applicationDenied);
}