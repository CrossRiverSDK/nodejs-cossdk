export interface ChangeCardStatusRequest {
    requestId: string;
    sourceSenderId?: string;
    cardToken: string;
    isActive: boolean;
}
