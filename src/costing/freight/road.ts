import { sum } from "../../maths/statistics";

/**
 * Calculating the transport cost for a single mode of transport with multiple legs
 * From Chris Nash' Transport Economics and Policy, p.75
 */
export var modeFreightTransportCost = (collectionCost: number, transferHandlingCosts: number[], transportLegCosts: number[], deliveryCost: number) => {
    return collectionCost + sum(transferHandlingCosts) + sum(transportLegCosts) + deliveryCost;
}

/**
 * Freight transport distance cost per distance (usually km).
 * From Chris Nash' Transport Economics and Policy, p.79
 */
export var distanceCostPerDistance = (totalDistanceCost: number, annualKilometresPerVehicle: number) => {
    return totalDistanceCost / annualKilometresPerVehicle;
}

/**
 * Implicit distance per half day for freight transport.
 * From Chris Nash' Transport Economics and Policy, p.79
 */
export var distancePerHalfDay = (annualKilometresPerVehicle: number, utilisedHalfDays: number) => {
    return annualKilometresPerVehicle / utilisedHalfDays;
}

/**
 * Freight transport time cost per half day.
 * From Chris Nash' Transport Economics and Policy, p.79
 */
export var timeCostPerHalfDay = (totalTimeCost: number, utilisedHalfDays: number) => {
    return totalTimeCost / utilisedHalfDays;
}

/**
 * Freight transport cost for small distances.
 * For any operations that can be completed in a half day.
 * From Chris Nash' Transport Economics and Policy, p.79 
 */
export var roadTransportCostForSmallDistancesGenerator = (halfDayTimeCost: number, distanceCostPerDistance: number) => 
    (distanceCovered: number) => {
        return halfDayTimeCost + distanceCovered * distanceCostPerDistance;
}

/**
 * Road transport cost for a one-way movement, assuming no backloads (or returning with just packing equipment).
 * For journeys that take longer than a half-day, and are therefore one-way.
 * Two parameters k1 and k2 need to be estimated from empirical analysis
 * From Chris Nash' Transport Economics and Policy, p.79
 */
export var roadTransportCostForOneWayMovementNoBackloadsGenerator = (k1: number, k2: number) => 
    (oneWayDistance: number) => {
        return k1 * oneWayDistance / (Math.log(k2 * oneWayDistance));
}