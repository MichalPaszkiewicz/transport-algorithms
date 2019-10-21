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