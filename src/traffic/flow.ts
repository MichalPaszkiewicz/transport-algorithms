/**
 * Concentration of traffic.
 * To be estimated from static analysis of a section of road.
 * Nash' Transport Economics and Policy p.114
 */
export var concentrationOfTraffic = (numberOfVehicles: number, lengthOfRoad: number) => numberOfVehicles / lengthOfRoad;

/**
 * Flow of traffic.
 * Counting passing vehicles at a certain point over a period of time.
 * Nash' Transport Economics and Policy p.114
 */
export var flowOfTraffic = (numberOfVehicles: number, periodOfTime: number) => numberOfVehicles / periodOfTime;

/**
 * Traffic flow in veh / time period.
 * Nash' Transport Economics and Policy p.116
 */
export var trafficFlow = (numberOfVehicles: number, vehicleSpeed: number) => numberOfVehicles * vehicleSpeed;

/**
 * Traffic speed.
 * Nash' Transport Economics and Policy p.118
 */
export var trafficSpeedGenerator = (freeFlowSpeed: number, jamConcentration: number) => 
    (concentration: number) => freeFlowSpeed * (1 - concentration / jamConcentration);