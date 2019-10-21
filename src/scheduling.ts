/**
 * For figuring out how long the average waiting time would be, given a distribution of vehicles with an average headway and some standard deviation from that headway.
 */
export var averageWaitingTime = (headway: number, standardDeviation: number) => {
    return (Math.pow(headway, 2) + Math.pow(standardDeviation, 2)) / (2 * headway);
}

/**
 * To figure out how many vehicles are needed to achieve a certain headway on a route with a set round trip
 */
export var minimumVehiclesRequiredForRoute = (roundTripRunningTime: number, headway: number) => {
    return Math.ceil(roundTripRunningTime / headway);
}

/**
 * To figure out what minimum headway is achievable for a number of vehicles on a particular route
 */
export var minimumHeadwayRequiredForVehiclesOnRoute = (roundTripRunningTime: number, vehicles: number) => {
    return roundTripRunningTime / vehicles;
}