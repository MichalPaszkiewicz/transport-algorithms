import { sum } from "./maths/statistics";

export var netIncome = (revenues: number[], expenses: number[]) => {
    return sum(revenues) - sum(expenses);
}

