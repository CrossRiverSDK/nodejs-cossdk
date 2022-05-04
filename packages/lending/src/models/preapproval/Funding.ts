import { Rail } from "./Rail";

export interface Funding {
    netFunding?: number;
    rails?: Array<Rail> | null;
}
