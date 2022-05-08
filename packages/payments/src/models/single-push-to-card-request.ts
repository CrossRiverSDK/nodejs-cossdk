export interface SinglePushToCardRequest {
    sourceSenderId?: string;
    sourceSenderName?: string;
    sourceMcc?: string;
    requestId?: string;
    cardToken: string;
    amount?: number;
}