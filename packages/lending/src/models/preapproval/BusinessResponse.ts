import { Address } from "./Address";
import { AuthorisedSignatory, mapAuthorisedSignatory } from "./AuthorisedSignatory";
import { BusinessOwner, mapBusinessOwner } from "./BusinessOwner";
import { BusinessType } from "./BusinessType";
import { CIP } from "./CIP";
import { MaskedTaxNumber } from "./MaskedTaxNumber";

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