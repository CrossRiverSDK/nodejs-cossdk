import { ApiConfiguration, ApiResponse, HttpMethod, PagedResults, QueryString } from "@cossdk/common";
import { executeApi, executeGetApi } from "@cossdk/token-provider";
import { mapPushTransactionResponse, PushTransactionResponse } from "../../models/push-transaction-response";
import { SinglePushToCardRequest } from "../../models/single-push-to-card-request";
import { PaymentsBase } from "../payments-base";
import { v4 as uuidv4 } from 'uuid';
import { PushTransactionsSearchFilter } from "../../models/push-transactions-search-filter";

export class PushTransactions extends PaymentsBase {

  constructor(config: ApiConfiguration) {
    super(config);
  }

  create(request: SinglePushToCardRequest):Promise<ApiResponse<PushTransactionResponse>>
  {
      this.validateInitialization();

      const mapper = (obj:ApiResponse<PushTransactionResponse>) => {
        mapPushTransactionResponse(obj.result);
      };

      if (!request.requestId)
        request.requestId = uuidv4();

      return executeApi<SinglePushToCardRequest, ApiResponse<PushTransactionResponse>>(
          `${this.baseUrl}/api/transaction`,
          HttpMethod.POST,
          request,
          undefined,
          mapper, 
          this.apiKey);
  }

  getMany(filter?: PushTransactionsSearchFilter):Promise<ApiResponse<PagedResults<PushTransactionResponse>>>
  {
      this.validateInitialization();

      const query = new QueryString();

      if (filter)
      {
        if (filter.cardToken) {
          query.set('cardToken', filter.cardToken);
        }

        if (filter.statusEnum) {
          query.set('statusEnum', filter.statusEnum);
        }

        if (filter.sourceSenderId) {
          query.set('sourceSenderId', filter.sourceSenderId);
        }

        if (filter.fromDate) {
          query.set('fromDate', filter.fromDate);
        }

        if (filter.toDate) {
          query.set('toDate', filter.toDate);
        }

        if (filter.pageNumber) {
          query.set('pageNumber', filter.pageNumber);
        }

        if (filter.pageSize) {
          query.set('pageSize', filter.pageSize);
        }  
      }

      const mapper = (obj:ApiResponse<PagedResults<PushTransactionResponse>>) => {
        obj.result.results.forEach(t => mapPushTransactionResponse(t));
      };

      return executeGetApi<ApiResponse<PagedResults<PushTransactionResponse>>>(
          `${this.baseUrl}/api/transaction`,
          query,
          mapper, 
          this.apiKey);
  }

  get(transactionId: string):Promise<ApiResponse<PushTransactionResponse>>
  {
      this.validateInitialization();

      const mapper = (obj:ApiResponse<PushTransactionResponse>) => {
        mapPushTransactionResponse(obj.result);
      };

      return executeGetApi<ApiResponse<PushTransactionResponse>>(
          `${this.baseUrl}/api/transaction/${transactionId}`,
          undefined,
          mapper, 
          this.apiKey);
  }
}

