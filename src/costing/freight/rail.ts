/** Nash' Transport Economics and Policy p.83 */
export interface ILocomotive{
    /** tc */
    tractionCostPerKm: number;
    /** la */
    accessChargePer1000GrossTonneKm: number;
    /** lw */
    weightInTonnes: number;

    hoursWorkNeededForDistance: (distance: number) => number;    
}

/** Nash' Transport Economics and Policy p.83 */
export interface IWagon{
    /** wa */
    accessChargePer1000GrossTonneKm: number; 
    /** ww */
    weightInTonnes: number;
    /** ws */
    proportionOfWagonTakenByOneTonne: number;
    /** Lift share */
    proportionOfPayloadTakenUpByOneTonneOfCommodityBeingMoved: number;

    annualStandingCost: number;

    maintenanceCost: number;

    hoursWorkNeededForDistance: (distance: number) => number;    
}

/**
 * Traction cost per tonne
 * From Chris Nash' Transport Economics and Policy, p.83
 */
export var tractionCostPerTonneGenerator = (locomotive: ILocomotive, wagon: IWagon) => 
    (distance: number, numberOfWagons: number) => {
        return locomotive.tractionCostPerKm * distance * wagon.proportionOfWagonTakenByOneTonne / numberOfWagons;
}

/**
 * Locomotive access cost per tonne
 * From Chris Nash' Transport Economics and Policy, p.83
 */
export var locoAccessCostPerTonneGenerator = (locomotive: ILocomotive, wagon: IWagon) => 
    (distance: number, numberOfWagons: number) => {
        return locomotive.accessChargePer1000GrossTonneKm * distance * locomotive.weightInTonnes * wagon.proportionOfWagonTakenByOneTonne / (1000 * numberOfWagons);
}   

/**
 * Wagon access cost per tonne
 * From Chris Nash' Transport Economics and Policy, p.83 
 */
export var wagonAccessCostPerTonneGenerator = (wagon: IWagon) => 
    (distance: number) => {
        return wagon.accessChargePer1000GrossTonneKm * distance * wagon.weightInTonnes * wagon.proportionOfWagonTakenByOneTonne / 1000;
}

/**
 * Marshalling cost per tonne
 * From Chris Nash' Transport Economics and Policy, p.84
 */
export var marshallingCostPerTonne = (wagon: IWagon, wagonMarshallingCost: number, trips: number) => {
    return wagonMarshallingCost * wagon.proportionOfWagonTakenByOneTonne * trips;
}

/**
 * Lifting cost per tonne
 * From Chris Nash' Transport Economics and Policy, p.84
 */
export var liftingCostPerTonne = (costPerLift: number, wagon: IWagon) => {
    return wagon.proportionOfPayloadTakenUpByOneTonneOfCommodityBeingMoved * costPerLift;
}

/**
 * Collection and Delivery (CD) cost per tonne
 * From Chris Nash' Transport Economics and Policy, p.84
 */
export var collectionAndDeliveryCostPerTonne = (costOfRoadMovement: number, numberOfCollectionsAndDeliveries: number) => {
    return costOfRoadMovement * numberOfCollectionsAndDeliveries;
}

/**
 * Traction cost per hour
 * Assumes 250 work days in a year of 12 hours each
 * From Chris Nash' Transport Economics and Policy, p.84
 */
export var tractionCostPerHour = (loco: ILocomotive, annualKm: number) => {
    return loco.tractionCostPerKm * annualKm / (250 * 12);
}

/**
 * Wagon cost per hour
 * Assumes 250 work days in a year of 12 hours each
 * From Chris Nash' Transport Economics and Policy, p.84
 */
export var wagonCostPerHour = (wagon: IWagon) => {
    return (wagon.annualStandingCost + wagon.maintenanceCost) / (250 * 24);
}

/**
 * Monetary cost of rail movement of a commodity
 * From Chris Nash' Transport Economics and Policy, p.84
 */
export var monetaryCostOfRailMovementOfCommodity = (
        loco: ILocomotive, 
        wagon: IWagon, 
        numberOfWagons: number, 
        distance: number, 
        marshallingCostForTonne: number, 
        marshallingTrips: number, 
        collectionAndDeliveryCost: number, 
        liftingCost: number) => {
    return tractionCostPerTonneGenerator(loco, wagon)(numberOfWagons, distance)
        + locoAccessCostPerTonneGenerator(loco, wagon)(distance, numberOfWagons)
        + wagonAccessCostPerTonneGenerator(wagon)(distance)
        + marshallingCostPerTonne(wagon, marshallingCostForTonne, marshallingTrips)
        + collectionAndDeliveryCost
        + liftingCostPerTonne(liftingCost, wagon)
        + loco.tractionCostPerKm * distance
        + wagonCostPerHour(wagon) * wagon.hoursWorkNeededForDistance(distance)
}