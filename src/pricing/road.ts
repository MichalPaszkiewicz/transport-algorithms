/**
 * Equilibrium generalised price which all users must face.
 * Nash' Transport Economics and Policy p.239.
 */
export var equilibriumGeneralisedPrice = 
    (costOfUsingVehicle: number, timeCostOfTripe: number, costOfBeingTooEarly: number, costOfBeingTooLate: number, numberOfCars: number, bottleneckCapacity: number) =>
    costOfUsingVehicle + ((costOfBeingTooEarly * costOfBeingTooLate)/(costOfBeingTooEarly + costOfBeingTooLate)) * numberOfCars / bottleneckCapacity;

/**
 * Marginal social cost.
 * The marginal external queuing and schedule delay cost imposed by a driver on other users.
 * Nash' Transport Economics and Policy p.241.
 */
export var marginalSocialCost = 
    (costOfUsingVehicle: number, timeCostOfTripe: number, costOfBeingTooEarly: number, costOfBeingTooLate: number, numberOfCars: number, bottleneckCapacity: number) =>
    costOfUsingVehicle + 2 * ((costOfBeingTooEarly * costOfBeingTooLate)/(costOfBeingTooEarly + costOfBeingTooLate)) * numberOfCars / bottleneckCapacity;