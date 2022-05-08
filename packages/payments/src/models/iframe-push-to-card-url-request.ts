export interface IFramePushToCardUrlRequest {
    requestId: string;
    domain: string;
    showOptionalFields?: boolean;
    sourceSenderId?: string;
    requireSourceSenderName?: boolean;
    successContinueNavigationPoint?: string;
    failureContinueNavigationPoint?: string;
}