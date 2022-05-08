import { ApiConfiguration, ApiResponse, HttpMethod, PagedResults, QueryString } from "@cossdk/common";
import { executeApi, executeGetApi } from "@cossdk/token-provider";
import { ChangeCardStatusRequest } from "../../models/change-card-status-request";
import { CreditCardInfo, mapCreditCardInfo } from "../../models/credit-card-info";
import { CardsSearchFilter } from "../../models/cards-search-filter";
import { SignupCardRequest } from "../../models/signup-card-request";
import { PaymentsBase } from "../payments-base";

export class Cards extends PaymentsBase {

  constructor(config: ApiConfiguration) {
    super(config);
  }

  create(request: SignupCardRequest):Promise<ApiResponse<CreditCardInfo>>
  {
      this.validateInitialization();

      const mapper = (obj:ApiResponse<CreditCardInfo>) => {
        mapCreditCardInfo(obj.result);
      };

      return executeApi<SignupCardRequest, ApiResponse<CreditCardInfo>>(
          `${this.baseUrl}/api/Card`,
          HttpMethod.POST,
          request,
          undefined,
          mapper, 
          this.apiKey);
  }

  update(request: ChangeCardStatusRequest):Promise<ApiResponse<CreditCardInfo>>
  {
      this.validateInitialization();

      const mapper = (obj:ApiResponse<CreditCardInfo>) => {
        mapCreditCardInfo(obj.result);
      };

      return executeApi<ChangeCardStatusRequest, ApiResponse<CreditCardInfo>>(
          `${this.baseUrl}/api/Card`,
          HttpMethod.PUT,
          request,
          undefined,
          mapper, 
          this.apiKey);
  }

  getMany(filter?: CardsSearchFilter):Promise<ApiResponse<PagedResults<CreditCardInfo>>>
  {
      this.validateInitialization();

      const query = new QueryString();

      if (filter)
      {
        if (filter.dateAddedFrom) {
          query.set('dateAddedFrom', filter.dateAddedFrom);
        }

        if (filter.dateAddedTo) {
          query.set('dateAddedTo', filter.dateAddedTo);
        }

        if (filter.sourceSenderId) {
          query.set('sourceSenderId', filter.sourceSenderId);
        }

        if (filter.firstName) {
          query.set('firstName', filter.firstName);
        }

        if (filter.lastName) {
          query.set('lastName', filter.lastName);
        }

        if (filter.isActive) {
          query.set('isActive', filter.isActive);
        }

        if (filter.cardCompany) {
          query.set('cardCompany', filter.cardCompany);
        }

        if (filter.pageNumber) {
          query.set('pageNumber', filter.pageNumber);
        }

        if (filter.pageSize) {
          query.set('pageSize', filter.pageSize);
        }  
      }

      const mapper = (obj:ApiResponse<PagedResults<CreditCardInfo>>) => {
        obj.result.results.forEach(c => mapCreditCardInfo(c));
      };

      return executeGetApi<ApiResponse<PagedResults<CreditCardInfo>>>(
          `${this.baseUrl}/api/Card`,
          query,
          mapper, 
          this.apiKey);
  }

  get(cardToken: string):Promise<ApiResponse<CreditCardInfo>>
  {
      this.validateInitialization();

      const mapper = (obj:ApiResponse<CreditCardInfo>) => {
        mapCreditCardInfo(obj.result);
      };

      return executeGetApi<ApiResponse<CreditCardInfo>>(
          `${this.baseUrl}/api/Card/${cardToken}`,
          undefined,
          mapper, 
          this.apiKey);
  }
}

