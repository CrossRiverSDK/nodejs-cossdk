import { CIPDecisionType } from "./CIPDecisionType";
import { CIPDocument } from "./CIPDocument";
import { CIPVendor } from "./CIPVendor";
import { CIPVerification } from "./CIPVerification";

export interface CIP {
    decision?: CIPDecisionType;
    vendors?: Array<CIPVendor> | null;
    documents?: Array<CIPDocument> | null;
    verifications?: Array<CIPVerification> | null;
}
