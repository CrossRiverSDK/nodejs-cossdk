export interface IFrameSignupCardUrlRequest {
    requestId: string;
    customerReferenceNumber: string;
    domain: string;
    successContinueNavigationPoint?: string;
    failureContinueNavigationPoint?: string;
    sourceSenderId?: string;
    firstName?: string;
    lastName?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    countryCode?: string;
    zipCode?: string;
    email?: string;
    phoneNumber?: string;
    showOptionalFields?: boolean;
}
