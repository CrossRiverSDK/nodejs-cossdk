import { ScoreType } from "./ScoreType";

export interface CreditBureauScore {
    score: number;
    scoreType: ScoreType;
    date: Date;
    creditScoreVersion: string;
}

export function mapCreditBureauScore(obj: CreditBureauScore)
{
    obj.date = new Date(obj.date);
}
