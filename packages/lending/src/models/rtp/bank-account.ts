import { IssuingBank } from "./issuing-bank";

export interface BankAccount {
    mplId: string;
    issuingBankId: IssuingBank;
    routingNumber: string;
    accountNumber: string;
}