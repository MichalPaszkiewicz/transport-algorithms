/**
 * Fuel consumption.
 * Parameters a,b,c and d need to be estimated for a particular vehicle.
 * As stated by UK DfT (2008).
 * From Chris Nash' Transport Economics and Policy p.95
 */
export var fuelConsumptionGenerator = (a: number, b: number, c: number, d: number) => 
    (speed: number) => {
    return a + b * speed + c * Math.pow(speed, 2) + d * Math.pow(speed, 3);
}