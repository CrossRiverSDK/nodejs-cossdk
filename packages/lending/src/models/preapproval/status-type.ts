/**
 * 
 * @export
 * @enum {string}
 */
export enum StatusType {
    ApprovalInProcess = 'ApprovalInProcess',
    Approved = 'Approved',
    Denied = 'Denied',
    CounterOffer = 'CounterOffer',
    CounterOfferAccepted = 'CounterOfferAccepted',
    CounterOfferNotAccepted = 'CounterOfferNotAccepted',
    ApprovedNotAccpeted = 'ApprovedNotAccpeted',
    CrbDenied = 'CRBDenied',
    Incomplete = 'Incomplete',
    LoanSubmittedToCrbUnderwritingAndFunding = 'LoanSubmittedToCRBUnderwritingAndFunding',
    DeclinationNoticeSent = 'DeclinationNoticeSent',
    InvestorApproved = 'InvestorApproved'
}