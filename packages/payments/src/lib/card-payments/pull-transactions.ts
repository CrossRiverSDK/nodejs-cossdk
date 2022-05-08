import { ApiConfiguration, ApiResponse, HttpMethod, PagedResults, QueryString } from "@cossdk/common";
import { executeApi, executeGetApi } from "@cossdk/token-provider";
import { mapPushTransactionResponse, PushTransactionResponse } from "../../models/push-transaction-response";
import { PaymentsBase } from "../payments-base";
import { v4 as uuidv4 } from 'uuid';
import { PullTransactionRequest } from "../../models/pull-transaction-request";
import { mapPullTransactionResponse, PullTransactionResponse } from "../../models/pull-transaction-response";
import { mapPullTransaction, PullTransaction } from "../../models/pull-transaction";
import { PullTransactionsSearchFilter } from "../../models/pull-transactions-search-filter";

export class PullTransactions extends PaymentsBase {

  constructor(config: ApiConfiguration) {
    super(config);
  }

  create(request: PullTransactionRequest):Promise<ApiResponse<PullTransactionResponse>>
  {
      this.validateInitialization();

      const mapper = (obj:ApiResponse<PullTransactionResponse>) => {
        mapPullTransactionResponse(obj.result);
      };

      if (!request.transactionRequestId)
        request.transactionRequestId = uuidv4();

      return executeApi<PullTransactionRequest, ApiResponse<PullTransactionResponse>>(
          `${this.baseUrl}/api/PullTransactions`,
          HttpMethod.POST,
          request,
          undefined,
          mapper, 
          this.apiKey);
  }

  getMany(filter?: PullTransactionsSearchFilter):Promise<ApiResponse<PagedResults<PullTransaction>>>
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

        if (filter.requesterIds) {
          query.set('requesterIds', filter.requesterIds);
        }

        if (filter.fromDate) {
          query.set('fromDate', filter.fromDate);
        }

        if (filter.toDate) {
          query.set('toDate', filter.toDate);
        }

        if (filter.transactionRequestId) {
          query.set('transactionRequestId', filter.transactionRequestId);
        }

        if (filter.fromAmount) {
          query.set('fromAmount', filter.fromAmount);
        }

        if (filter.toAmount) {
          query.set('toAmount', filter.toAmount);
        }

        if (filter.transactionResponse) {
          query.set('transactionResponse', filter.transactionResponse);
        }

        if (filter.rail) {
          query.set('rail', filter.rail);
        }

        if (filter.paymentSent) {
          query.set('paymentSent', filter.paymentSent);
        }

        if (filter.responseReceived) {
          query.set('responseReceived', filter.responseReceived);
        }

        if (filter.responseCode) {
          query.set('responseCode', filter.responseCode);
        }

        if (filter.traceNumber) {
          query.set('traceNumber', filter.traceNumber);
        }

        if (filter.network) {
          query.set('network', filter.network);
        }

        if (filter.sortPropertyName) {
          query.set('sortPropertyName', filter.sortPropertyName);
        }

        if (filter.defaultSortingPropertyName) {
          query.set('defaultSortingPropertyName', filter.defaultSortingPropertyName);
        }

        if (filter.sortDirection) {
          query.set('sortDirection', filter.sortDirection);
        }

        if (filter.pageNumber) {
          query.set('pageNumber', filter.pageNumber);
        }

        if (filter.pageSize) {
          query.set('pageSize', filter.pageSize);
        }  
      }

      const mapper = (obj:ApiResponse<PagedResults<PullTransaction>>) => {
        obj.result.results.forEach(t => mapPullTransaction(t));
      };

      return executeGetApi<ApiResponse<PagedResults<PullTransaction>>>(
          `${this.baseUrl}/api/PullTransactions`,
          query,
          mapper, 
          this.apiKey);
  }

  get(transactionRequestId: string):Promise<ApiResponse<PullTransaction>>
  {
      this.validateInitialization();

      const mapper = (obj:ApiResponse<PullTransaction>) => {
        mapPullTransaction(obj.result);
      };

      return executeGetApi<ApiResponse<PullTransaction>>(
          `${this.baseUrl}/api/PullTransactions/${transactionRequestId}`,
          undefined,
          mapper, 
          this.apiKey);
  }
}

