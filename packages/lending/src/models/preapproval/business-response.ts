import { Address } from "./address";
import { AuthorisedSignatory, mapAuthorisedSignatory } from "./authorised-signatory";
import { BusinessOwner, mapBusinessOwner } from "./business-owner";
import { BusinessType } from "./BusinessType";
import { CIP } from "./cip";
import { MaskedTaxNumber } from "./masked-tax-number";

export interface BusinessResponse {
    taxNumber: MaskedTaxNumber;
    incDate: Date;
    stateIncorp: string;
    countryDomicile: string;
    phone: string;
    email: string;
    addresses?: Array<Address> | null;
    name: string;
    payrollType?: string | null;
    businessType: BusinessType;
    businessPurpose: string;
    industry: string;
    naicsCode: string;
    franchise?: boolean;
    businessOwner?: Array<BusinessOwner> | null;
    cip: CIP;
    registeredTradingNames: string;
    productServicesOffered?: string | null;
    insuranceType?: string | null;
    authorisedSignatory: AuthorisedSignatory;
    authorisedSignatoryVerificationMethod: CIP;
    businessLicenseInformation?: string | null;
    businessWebSiteVerification?: boolean;
    businessAnnualTurnOver?: string | null;
    businessPricingDetails?: string | null;
    businessCreditLimit?: string | null;
    businessApprovalException?: boolean;
}

export function mapBusinessResponse(obj: BusinessResponse)
{
    obj.incDate = new Date(obj.incDate);

    if (obj.businessOwner)
        obj.businessOwner.forEach(b => mapBusinessOwner(b));

    mapAuthorisedSignatory(obj.authorisedSignatory);    
}