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

/** 
 * Change in expected number of crashes. 
 * An engineering change is expected to make some effect on the number of crashes, but it is subject to the human behavioural adaptation - in this case represented by the human feedback parameter.
 * f = human feedback parameter.
 * f = 0 -> No behavioural adaptation (eg airbags).
 * -1 < f < 0 -> behavioural adaptation that reduces engineering effect (eg road lighting).
 * f = -1 -> no effect on actual safety (eg bright road surfaces).
 * f < -1 -> measure has an adverse effect on safety as a result of behavioural adaptation (eg marked pedestrian crossings).
 * Rudin-Brown & Jamson's Behavioural Adaptation and Road Safety p.380
 */
export var actualChangeInExpectedNumberOfCrashes = (engineeringChangeInExpectedAmountOfCrashes: number, humanFeedBackParameter: number) => 
    (1 + humanFeedBackParameter) * engineeringChangeInExpectedAmountOfCrashes;

/**
 * Expected casualties from exposure, crash rate and injury rate.
 * From Rudin-Brown and Jamson's Behavioural Adaptation and Road Safety p.410
 */
export var casualtiesFromECI = (exposure: number, crashRate: number, injuryRate: number) => exposure * crashRate * injuryRate;

/**
 * Expected casualties from crashes per km and casualties per crash.
 * From Rudin-Brown and Jamson's Behavioural Adaptation and Road Safety p.410
 */
export var casualtiesFromCKCC = (crashesPerKm: number, casualtiesPerCrash: number) => crashesPerKm * casualtiesPerCrash;