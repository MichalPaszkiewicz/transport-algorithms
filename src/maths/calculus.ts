/**
 * Integrate, using the trapezium rule
 */
export var integrate = (func: (num: number) => number, lowerBound: number, upperBound: number, steps: number) => {
    if(upperBound <= lowerBound){
        throw new Error("The upper bound must be greater than the lower bound when integrating");
    }
    var stepSize = (upperBound - lowerBound) / steps;
    var runningTotal = 0;
    for(var i = 0; i < steps; i++){
        let f_lower = func(lowerBound + i * stepSize);
        let f_higher = func(lowerBound + (i + 1) * stepSize);
        runningTotal += stepSize * (f_lower + f_higher) / 2;
    }
    return runningTotal;
}

const MAX_SAFE_INTEGER_OVER_THOUSAND = 9007199254740;

/**
 * Value of derivative at a particular point.
 * Keep deltaX as small as possible for greater accuracy on curves, but has to be bigger than to be affected by rounding errors.
 */
export var derivativeAtPoint = (func: (num: number) => number, x: number, deltaX: number = (x / MAX_SAFE_INTEGER_OVER_THOUSAND)) => {
    return (func(x + deltaX) - func(x)) / deltaX;
}