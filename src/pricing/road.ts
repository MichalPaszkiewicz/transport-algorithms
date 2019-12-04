/**
 * Nash' Transport Economics and Policy p.239.
 */
var delta = (costOfBeingTooEarly: number, costOfBeingTooLate: number) => costOfBeingTooEarly * costOfBeingTooLate / (costOfBeingTooEarly + costOfBeingTooLate);

/**
 * Equilibrium generalised price which all users must face.
 * Nash' Transport Economics and Policy p.239.
 */
export var equilibriumGeneralisedPrice = 
    (costOfUsingVehicle: number, costOfBeingTooEarly: number, costOfBeingTooLate: number, numberOfCars: number, bottleneckCapacity: number) =>
    costOfUsingVehicle + (delta(costOfBeingTooEarly, costOfBeingTooLate)) * numberOfCars / bottleneckCapacity;

/**
 * Marginal social cost.
 * The marginal external queuing and schedule delay cost imposed by a driver on other users.
 * Nash' Transport Economics and Policy p.241.
 */
export var marginalSocialCost = 
    (costOfUsingVehicle: number, costOfBeingTooEarly: number, costOfBeingTooLate: number, numberOfCars: number, bottleneckCapacity: number) =>
    costOfUsingVehicle + 2 * (delta(costOfBeingTooEarly, costOfBeingTooLate)) * numberOfCars / bottleneckCapacity;

/**
 * Generalised cost of travel.
 * alpha and beta (behavioural values of travel time and excess time respectively) to be estimated from practice.
 * Excess time refers to walking, waiting and any transfer time.
 * beta is usually approximately 2alpha, meaning that people are willing to pay twice as much to reduce excess time.
 * Boyce & Williams' Forecasting Urban Travel p.90.
 */
export var generalisedTravelCostGenerator = (alpha: number, beta: number) => 
    (travelTime: number, excessTime: number, moneyCost: number) => alpha * travelTime + beta * excessTime + moneyCost;