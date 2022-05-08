import { InterestAccrualMethod } from "./interest-accrual-method";
import { PaymentFrequencyType } from "./payment-frequency-type";
import { RateType } from "./rate-type";

export interface TILA {
    amortization: number;
    term: number;
    rateType: RateType;
    finalPaymentDate: Date;
    finalPayment: number;
    financeCharge: number;
    totalPayments: number;
    ppy: number;
    paymentFrequency: PaymentFrequencyType;
    apr: number;
    interestAccrualMethod: InterestAccrualMethod;
    interestAccrualMethodDays: number;
    firstPaymentDueDate: Date;
    rate: number;
    periodicPayment: number;
    originationFee: number;
}

export function mapTILA(obj: TILA)
{
    obj.finalPaymentDate = new Date(obj.finalPaymentDate);
    obj.firstPaymentDueDate = new Date(obj.firstPaymentDueDate);
}