import { ApiConfiguration, ApiResponse } from "@cossdk/common";
import { executeGetApi } from "@cossdk/token-provider";
import { EnumResponse } from "../../models/enum-response";
import { PaymentsBase } from "../payments-base";

export class Enums extends PaymentsBase {

  constructor(config: ApiConfiguration) {
    super(config);
  }

  cardCompanies():Promise<ApiResponse<Array<EnumResponse>>>
  {
      this.validateInitialization();

      return executeGetApi<ApiResponse<Array<EnumResponse>>>(
          `${this.baseUrl}/api/Enum/CardCompanies`,
          undefined,
          undefined, 
          this.apiKey);
  }

  transactionStatuses():Promise<ApiResponse<Array<EnumResponse>>>
  {
      this.validateInitialization();

      return executeGetApi<ApiResponse<Array<EnumResponse>>>(
          `${this.baseUrl}/api/Enum/TransactionStatuses`,
          undefined,
          undefined, 
          this.apiKey);
  }
}

