/**
 * Payments hook event types.
 * @export
 * @enum {string}
 */
 export enum PaymentsHookEventType {
    AccountCreditReceived = "accountcreditreceived",
    Authorization = "authorization",
    CardStatusChanged = "cardstatuschanged",
    OnboardingApproved = "onboardingapproved",
    OnboardingNotification = "onboardingnotification",
    Transaction = "transaction",
    TransactionBatchCompleted = "transactionbatchcompleted",
    TransactionStatusChanged = "transactionstatuschanged"
}