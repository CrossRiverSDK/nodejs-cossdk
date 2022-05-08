import { CIPDecisionType } from "./cip-decision-type";
import { CIPDocument } from "./cip-document";
import { CIPVendor } from "./cip-vendor";
import { CIPVerification } from "./cip-verification";

export interface CIP {
    decision?: CIPDecisionType;
    vendors?: Array<CIPVendor> | null;
    documents?: Array<CIPDocument> | null;
    verifications?: Array<CIPVerification> | null;
}
