import { sum } from "../maths/statistics";

/**
 * Accessibility of a place.
 * Destination masses take into account transport costs to go to the destinations.
 * From Hickman, Givoni, Bonilla and Banister's Handbook on Transport and Development p.235.
 */
export var accessibility = (destinationMasses: number[], generalisedDestinationCosts: number[], costDecayFunction: (dist: number) => number) => {
    return sum(destinationMasses.map((dm, i) => dm * costDecayFunction(generalisedDestinationCosts[i])));
}

/**
 * Standard cost decay function for measuring accessibility of an area.
 * The paramater "param" is set to 1 when providing reference values. 
 * For calculating real values, "param" should be estimated from empirical data.
 * From Hickman, Givoni, Bonilla and Banister's Handbook on Transport and Development p.235.
 */
export var accessibilityCostDecayFunctionGenerator = (param: number) => (cost: number) => {
    return Math.pow(cost, -param);
}