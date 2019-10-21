/**
 * Cost of transporting goods
 * From Chris Nash' Transport Economics and Policy, p.74
 */
export var freightTransportCost = 
    (lineHaulRoadCost: number, 
    roadDistributionCost: number, 
    railTransportCost: number, 
    airTransportCost: number, 
    maritimeCost: number, 
    pipelineCost: number) => {
        return lineHaulRoadCost + roadDistributionCost + railTransportCost + airTransportCost + maritimeCost + pipelineCost;
}

/**
 * Freight transport costing.
 * From Chris Nash' Transport Economics and Policy, p.74
 */
export var totalLogisticFreightCost = (freightTransportCost: number, 
                                        warehouseAndHandlingCost: number, 
                                        inventoryCarryingCost: number, 
                                        costOfManagement: number) => {
    return freightTransportCost + warehouseAndHandlingCost + inventoryCarryingCost + costOfManagement;
}