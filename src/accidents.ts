import { derivativeAtPoint, integrate } from "./maths/calculus";

export type WealthUtilityFunction = (wealth: number) => number;

/**
 * Expected utility.
 * For measuring value of statistical life.
 * Utility of wealth of death also seen as "bequest".
 * Nash' Transport Economics and Policy p.158
 */
export var expectedUtilityGenerator = (utilityOfWealthOfLife: WealthUtilityFunction, utilityOfWealthOfDeath: WealthUtilityFunction) => 
    (probabilityOfSurvival: number, wealth: number) => 
    probabilityOfSurvival * utilityOfWealthOfLife(wealth) - (1 - probabilityOfSurvival) * utilityOfWealthOfDeath(wealth);

/**
 * Expected wealth.
 * For measuring value of statistical life.
 * Utility of wealth of death also seen as "bequest".
 * Nash' Transport Economics and Policy p.158
 */
export var expectedWealthGenerator = (utilityOfWealthOfLife: WealthUtilityFunction, utilityOfWealthOfDeath: WealthUtilityFunction) => 
    (probabilityOfSurvival: number, riskReduction: number, wealth: number, willingnessToPay: number) =>
    (probabilityOfSurvival + riskReduction) * utilityOfWealthOfLife(wealth - willingnessToPay) 
    + (1 - (probabilityOfSurvival + riskReduction)) * utilityOfWealthOfDeath(wealth - willingnessToPay);

/**
 * Willingness to pay for an infinitesimal risk riskReduction.
 * Nash' Transport Economics and Policy p.158
 */
export var willingnessToPayGenerator = (utilityOfWealthOfLife: WealthUtilityFunction, utilityOfWealthOfDeath: WealthUtilityFunction) => 
    (probabilityOfSurvival: number, wealth: number) => 
    (utilityOfWealthOfLife(wealth) - utilityOfWealthOfDeath(wealth)) / 
    (probabilityOfSurvival * derivativeAtPoint(utilityOfWealthOfLife, wealth) + (1 - probabilityOfSurvival) * derivativeAtPoint(utilityOfWealthOfDeath, wealth));

/**
 * Remaining expected utility of person.
 * Nash' Transport Economics and Policy p.160.
 * NOTE: Not sure on the meaning of u[c(t)] in the book
 */
export var remainingExpectedUtilityOfPersonGenerator = (utility: (t: number) => number, survivalProbability: (time: number, startAge: number) => number) => 
    (age: number, discountRate: number) => 
    integrate((time) => utility(time) * Math.exp(- discountRate * (time - age)) * survivalProbability(time, age), age, 100000000000, 10000);

/**
 * Marginal rate of substitution between initial wealth and risk.
 * Nash' Transport Economics and Policy p.160.
 */
export var marginalRateOfSubstitutionGenerator = (utility: (t: number) => number, survivalProbability: (time: number, startAge: number) => number, marginalUtilityOfConsumption: (age: number) => number) => 
    (age: number, discountRate: number) => 
    remainingExpectedUtilityOfPersonGenerator(utility, survivalProbability)(age, discountRate) / marginalUtilityOfConsumption(age);

/**
 * Value of life years lost.
 * Value of a statistical life year.
 * Annuity which discounted over the remaining life span of the individual at risk would equal the marginal rate of substitution.
 * Nash' Transport Economics and Policy p.161.
 */
export var valueOfLifeYearsLostGenerator = (utility: (t: number) => number, survivalProbability: (time: number, startAge: number) => number, marginalUtilityOfConsumption: (age: number) => number) => 
    (age: number, discountRate: number, remainingLifetime: number) => 
    marginalRateOfSubstitutionGenerator(utility, survivalProbability, marginalUtilityOfConsumption)(age, discountRate) / ((1 - Math.pow(1 + discountRate, - remainingLifetime)) / discountRate);