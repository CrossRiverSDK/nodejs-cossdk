/**
 * Payments hook event types.
 * @export
 * @enum {string}
 */
 export enum PaymentsHookEventType {
    AdjustmentActionUpdate = "adjustmentactionupdate",
    ComplianceLoanFailed = "complianceloanfailed",
    FundingAttemptComplete = "fundingattemptcomplete",
    LoanStatusUpdated = "loanstatusupdated",
    RailUpdated = "railupdated"
}