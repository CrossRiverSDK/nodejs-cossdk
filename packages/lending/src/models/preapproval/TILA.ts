import { InterestAccrualMethod } from "./InterestAccrualMethod";
import { PaymentFrequencyType } from "./PaymentFrequencyType";
import { RateType } from "./RateType";

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