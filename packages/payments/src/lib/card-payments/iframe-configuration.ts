import { ApiConfiguration, ApiResponse, HttpMethod } from "@cossdk/common";
import { executeApi } from "@cossdk/token-provider";
import { IFramePushToCardUrlRequest } from "../../models/iframe-push-to-card-url-request";
import { IFrameSignupCardUrlRequest } from "../../models/iframe-signup-card-url-request";
import { PaymentsBase } from "../payments-base";

export class IFrameConfiguration extends PaymentsBase {

  constructor(config: ApiConfiguration) {
    super(config);
  }

  buildSignupCardUrl(request: IFrameSignupCardUrlRequest):Promise<ApiResponse<string>>
  {
    this.validateInitialization();

    return executeApi<IFrameSignupCardUrlRequest, ApiResponse<string>>(
        `${this.baseUrl}/api/IFrameConfiguration/BuildSignupCardUrl`,
        HttpMethod.POST,
        request,
        undefined,
        undefined, 
        this.apiKey);
  }

  pushToCardUrlRequest(request: IFramePushToCardUrlRequest):Promise<ApiResponse<string>>
  {
    this.validateInitialization();

    return executeApi<IFramePushToCardUrlRequest , ApiResponse<string>>(
        `${this.baseUrl}/api/IFrameConfiguration/BuildPushToCardUrl`,
        HttpMethod.POST,
        request,
        undefined,
        undefined, 
        this.apiKey);
  }
}