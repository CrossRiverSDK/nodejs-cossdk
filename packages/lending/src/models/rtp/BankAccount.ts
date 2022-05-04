import { IssuingBank } from "./IssuingBank";

export interface BankAccount {
    mplId: string;
    issuingBankId: IssuingBank;
    routingNumber: string;
    accountNumber: string;
}