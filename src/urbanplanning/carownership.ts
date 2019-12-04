/**
 * Cars per capita for Car ownership forecasting.
 * alpha and beta params to be determined.
 * Boyce & Williams' Forecasting Urban Travel p.124.
 */
export var carOwnershipGenerator = (alpha: number, beta: number) =>
    (saturationLevel: number, time: number) => saturationLevel / (1 + beta * Math.exp(-alpha * saturationLevel * time));