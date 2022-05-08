import { ApiConfiguration, ApiResponse } from "@cossdk/common";
import { executeGetApi } from "@cossdk/token-provider";
import { mapOneTimeCodeResponse, OneTimeCodeResponse } from "../../models/one-time-code-response";
import { PaymentsBase } from "../payments-base";

export class OneTimeCodes extends PaymentsBase {

  constructor(config: ApiConfiguration) {
    super(config);
  }

  get(sourceSenderId: string):Promise<ApiResponse<OneTimeCodeResponse>>
  {
      this.validateInitialization();

      const mapper = (obj:ApiResponse<OneTimeCodeResponse>) => {
        mapOneTimeCodeResponse(obj.result);
      };

      return executeGetApi<ApiResponse<OneTimeCodeResponse>>(
          `${this.baseUrl}/api/onetimecode/${sourceSenderId}`,
          undefined,
          mapper, 
          this.apiKey);
  }
}