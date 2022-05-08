import { ApiConfiguration } from "@cossdk/common";

export interface CardPaymentsConfiguration extends ApiConfiguration
{
    pullTransactionsUrl:string;
    hooksUrl:string;
}