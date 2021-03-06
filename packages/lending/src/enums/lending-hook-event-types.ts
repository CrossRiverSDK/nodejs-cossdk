/**
 * Lending hook event types.
 * @export
 * @enum {string}
 */
 export enum LendingHookEventType {
    AdjustmentActionUpdate = "adjustmentactionupdate",
    ComplianceLoanFailed = "complianceloanfailed",
    FundingAttemptComplete = "fundingattemptcomplete",
    LoanStatusUpdated = "loanstatusupdated",
    RailUpdated = "railupdated"
}