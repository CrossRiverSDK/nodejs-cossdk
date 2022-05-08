export interface SignupCardRequest {
    requestId: string;
    firstName: string;
    lastName: string;
    sourceSenderId?: string;
    ownerExternalId?: string;
    address1?: string;
    address2?: string;
    city?: string;
    countryCode?: string;
    state?: string;
    zipCode?: string;
    phoneNumber?: string;
    email?: string;
    creditCardNumber: string;
    expirationMonth: number;
    expirationYear: number;
    cvv?: string;
}