import { sum } from "./maths/statistics";

export var netIncome = (revenues: number[], expenses: number[]) => {
    return sum(revenues) - sum(expenses);
}

/**
 * The present value of an amount over a time period of N years at a rate of interest.
 * For cost benefit cash flow.
 * Portman's PRINCE2 In practice p.74.
 */
export var presentValue = (amount: number, numberOfYears: number, rateOfInterestAsPercentage: number) => 
    amount * Math.pow(1/(1 + rateOfInterestAsPercentage / 100), numberOfYears);