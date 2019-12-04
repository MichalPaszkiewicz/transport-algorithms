/**
 * Travel time on link
 * Nash' Transport Economics and Policy p.94
 * Coefficients alpha and beta require estimation
 */
export var travelTimeOnLinkGenerator = (alpha: number, beta: number) => 
    (freeFlowTravelTime: number, flowOnLink: number, capacityOfLink: number) => {
    return freeFlowTravelTime * (1 + alpha * Math.pow(flowOnLink / capacityOfLink, beta));
}

/**
 * Marginal travel times
 * d(travel time on link x flow on link)/d(flow on link)
 * Nash' Transport Economics and Policy p.94
 * Coefficients alpha and beta require estimation
 */
export var marginalTravelTimesGenerator = (alpha: number, beta: number) => 
    (travelTimeOnLink: number, freeFlowTravelTime: number, flowOnLink: number, capacityOfLink: number) => {
        return travelTimeOnLink + freeFlowTravelTime * alpha * beta * Math.pow(flowOnLink / capacityOfLink, beta);
}

/**
 * CATS congested travel time function
 * Boyce and Williams' Forecasting Urban Travel p.68
 */
export var congestedTravelTimeOnLink = (travelTimeOnLinkAtZeroVolume: number, volumeOnLink: number, designCapacityOfLink: number) => 
    travelTimeOnLinkAtZeroVolume * Math.pow(2, volumeOnLink / designCapacityOfLink);

/**
 * BPR volume-delay function.
 * Essentially same as "travelTimeOnLinkGenerator", with pre-assigned params.
 * Boyce and Williams' Forecasting Urban Travel p.69
 */
export var travelTimeAtWhichAssignedVolumeCanTravelOnLink = (baseTravelTimeAtZeroVolume: number, assignedVolume: number, practicalCapacity: number) =>
    baseTravelTimeAtZeroVolume * (1 + 0.15 * Math.pow(assignedVolume / practicalCapacity, 4));
