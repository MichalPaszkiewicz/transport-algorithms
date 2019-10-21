import { sum } from "../maths/statistics";

/**
 * Ratio of land used for employment.
 * From Hickman, Givoni, Bonilla and Banister's Handbook on Transport and Development p.105.
 * "xi"
 */
export var employmentLandRatio = (employmentUseLandArea: number, housingUseLandArea: number) => {
    return employmentUseLandArea / (employmentUseLandArea + housingUseLandArea);
}

/**
 * Regional average ratio weighted by population of land used for employment.
 * From Hickman, Givoni, Bonilla and Banister's Handbook on Transport and Development p.105.
 * "xw"
 */
export var employmentRegionalAverageRatio = (employmentUseLandAreas: number[], housingUseLandAreas: number[], populationOfZones: number[]) => {
    return sum(employmentUseLandAreas.map((eula, i) => employmentLandRatio(eula, housingUseLandAreas[i]) * populationOfZones[i])) / sum(populationOfZones);
}

/**
 * Index of mixed use of zone
 * From Hickman, Givoni, Bonilla and Banister's Handbook on Transport and Development p.105
 */
export var indexOfMixedUseForZone = (employmentUseLandAreas: number[], housingUseLandAreas: number[], populationOfZones: number[], zoneIndex: number) => {
    var xi = employmentLandRatio(employmentUseLandAreas[zoneIndex], housingUseLandAreas[zoneIndex]);
    var xw = employmentRegionalAverageRatio(employmentUseLandAreas, housingUseLandAreas, populationOfZones);
    return 100 * ((xi - xw) / xw);
}