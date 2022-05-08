import { Rail } from "./rail";

export interface Funding {
    netFunding?: number;
    rails?: Array<Rail> | null;
}
