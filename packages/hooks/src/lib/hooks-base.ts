import { QueryString, stringIsEmpty } from "@cossdk/common";
import { EventDetailsFilter } from "../models/event-details-filter";
import { HookEvent } from "../models/hook-event";
import { HookEventDetails } from "../models/hook-event-details";
import { HooksOptions } from "../models/hooks-options";
import { RegistrationsEventsFilter } from "../models/registrations-events-filter";

export abstract class HooksBase {

    constructor(private options: HooksOptions)
    {

    }

    protected get baseUrl() {
        return this.options.baseUrl.replace(/\/+$/, '');
    }

    protected get apiKey() {
        return this.options.apiKey;
    }

    protected validateInitialization()
    {
        if (stringIsEmpty(this.options.baseUrl))
            throw new Error('You must initialize the hooks sdk by calling Hooks.initialize().');
    }

    protected mapEvent(e: HookEvent)
    {
        e.created = new Date(e.created);
    }

    protected mapEventDetails(ed: HookEventDetails)
    {
        ed.timeSent = new Date(ed.timeSent);
        ed.created = new Date(ed.created);
        if (ed.requestedAt)
            ed.requestedAt = new Date(ed.requestedAt);
    }

    protected setEventDetailsFilterQueryString(filter: EventDetailsFilter, query: QueryString)
    {
        if (filter.hookCorrelationId) {
            query.set('HookCorrelationId', filter.hookCorrelationId);
        }

        if (filter.extendedCorrelations) {
            query.set('ExtendedCorrelations', filter.extendedCorrelations);
        }

        if (filter.hookType) {
            query.set('HookType', filter.hookType);
        }

        if (filter.messageType) {
            query.set('MessageType', filter.messageType);
        }

        if (filter.httpMethod) {
            query.set('HttpMethod', filter.httpMethod);
        }

        if (filter.uri) {
            query.set('Uri', filter.uri);
        }

        if (filter.authenticationType) {
            query.set('AuthenticationType', filter.authenticationType);
        }

        if (filter.authenticationOptions) {
            query.set('AuthenticationOptions', filter.authenticationOptions);
        }

        if (filter.requestHeaders) {
            query.set('RequestHeaders', filter.requestHeaders);
        }

        if (filter.requestPayload) {
            query.set('RequestPayload', filter.requestPayload);
        }

        if (filter.responseHeaders) {
            query.set('ResponseHeaders', filter.responseHeaders);
        }

        if (filter.responsePayload) {
            query.set('ResponsePayload', filter.responsePayload);
        }

        if (filter.responseCode) {
            query.set('ResponseCode', filter.responseCode);
        }

        if (filter.clientException) {
            query.set('ClientException', filter.clientException);
        }

        if (filter.fromTimeSent) {
            query.set('FromTimeSent', filter.fromTimeSent);
        }

        if (filter.toTimeSent) {
            query.set('ToTimeSent', filter.toTimeSent);
        }

        if (filter.requestedBy) {
            query.set('RequestedBy', filter.requestedBy);
        }

        if (filter.fromRequestedAt) {
            query.set('FromRequestedAt', filter.fromRequestedAt);
        }

        if (filter.toRequestedAt) {
            query.set('ToRequestedAt', filter.toRequestedAt);
        }
    }

    protected setRegistrationsEventDetailsFilterQueryString(filter: RegistrationsEventsFilter, query: QueryString)
    {
        if (filter.id) {
            query.set('Id', filter.id);
        }

        if (filter.payload) {
            query.set('Payload', filter.payload);
        }

        if (filter.sent) {
            query.set('Sent', filter.sent);
        }

        if (filter.fromCreated) {
            query.set('FromCreated', filter.fromCreated);
        }

        if (filter.toCreated) {
            query.set('ToCreated', filter.toCreated);
        }

        if (filter.sortPropertyName) {
            query.set('SortPropertyName', filter.sortPropertyName);
        }

        if (filter.defaultSortingPropertyName) {
            query.set('DefaultSortingPropertyName', filter.defaultSortingPropertyName);
        }

        if (filter.sortDirection) {
            query.set('SortDirection', filter.sortDirection);
        }

        if (filter.pageNumber) {
            query.set('PageNumber', filter.pageNumber);
        }

        if (filter.pageSize) {
            query.set('PageSize', filter.pageSize);
        }
    }
}