import { ApiConfiguration, ApiResponse, HttpMethod } from "@cossdk/common";
import { executeApi } from "@cossdk/token-provider";
import { BankAccount } from "../models/rtp/BankAccount";
import { LendingBase } from "./lending-base";

export class Rtp extends LendingBase {
  
    constructor(config: ApiConfiguration) {
        super(config);
    }

    addBankAccount(request: BankAccount):Promise<ApiResponse<BankAccount>>
    {
        this.validateInitialization();

        return executeApi<BankAccount, ApiResponse<BankAccount>>(
            `${this.baseUrl}/Rtp/v1/BankAccount`,
            HttpMethod.POST,
            request,
            undefined,
            undefined, 
            this.apiKey);
    }
}