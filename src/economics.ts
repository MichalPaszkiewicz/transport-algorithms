/**
 * Competitiveness of an ith competitor in an array of informations of size j with weightings [ith competitor][jth datum].
 * From Jurewicz & Kaszubowski "Method for Assessing Rail Transport Competitiveness in Poland and the United Kingdom"
 */
export var competitivenessIndex = (arr: number[][], preferenceWeighting: number[], index: number) => {
    if (index > arr.length) {
        throw new Error("The index chosen must be lower than the number of competitors specified");
    }
    if (arr[0].length != preferenceWeighting.length) {
        throw new Error("The amount of data per ith row must equal the amount of preference weightings");
    }
    var total = 0;
    for (var j = 0; j < arr[0].length; j++) {
        var sumOnInformation = arr.reduce((a, b, i) => a + b[j], 0);
        total += preferenceWeighting[j] * (1 - arr[index][j] / sumOnInformation);
    }
    return total;
}

/**
 * Competitiveness indices of an array of informations of size j with weightings [ith competitor][jth datum]
 */
export var competitivenessIndices = (arr: number[][], preferenceWeighting: number[]) => {
    return arr.map((a, i) => competitivenessIndex(arr, preferenceWeighting, i));
}

/**
 * A measure of amount of competition in an industry.
 * Tends to 1/N for a large amount of competition (1 for a monopoly).
 */
export var herfindahlHirschmanIndex = (arr: number[]) => {
    var total = arr.reduce((x, y) => x + y, 0);
    var marketShares = arr.map(x => x / total);
    return marketShares.reduce((x, y) => x + Math.pow(y, 2), 0)
}

/**
 * A measure of amount of competition in an industry.
 * Tends to 0 for a large amount of competition (1 for a monopoly).
 */
export var normalisedHerfindahlIndex = (arr: number[]) => {
    if (arr.length == 1) {
        return 1;
    }
    var hhi = herfindahlHirschmanIndex(arr);
    return (hhi - 1 / arr.length) / (1 - 1 / arr.length);
}

/**
 * A measure of dominance in an industry. 
 * The sum of the squared differences between each firm's share and the next largest share in the market.
 * 0 - no dominance. 1 - full dominance 
 */
export var kwokaDominanceIndex = (arr: number[]) => {
    if (arr.length < 2) {
        throw new Error("The Kwoka Dominance Index is meaningless for a monopoly");
    }
    if (arr.reduce((a, b) => a + b, 0) > 1 || arr.reduce((a, b) => a + b, 0) < 0) {
        throw new Error("The Kwoka Dominance index only works on an array of fraction of market shares")
    }
    var total = 0;
    var sortedArr = arr.sort((x, y) => y - x);
    for (var i = 0; i < sortedArr.length - 1; i++) {
        total += Math.pow(sortedArr[i] - sortedArr[i + 1], 2);
    }
    return total;
}

/**
 * A measure of dominance in an industry.
 * The Herfindahl index of a Herfindahl index.
 */
export var garciaAlbaDominanceIndex = (arr: number[]) => {
    if (arr.reduce((a, b) => a + b, 0) > 1 || arr.reduce((a, b) => a + b, 0) < 0) {
        throw new Error("The Garcia Alba Dominance index only works on an array of fraction of market shares")
    }
    var hhi = herfindahlHirschmanIndex(arr);
    var total = arr.reduce((x, y) => x + y, 0);
    var shares = arr.map(x => x / total);
    var squaredFirmContributions = shares.map(x => Math.pow(x, 2) / hhi);
    return squaredFirmContributions.reduce((x, y) => x + Math.pow(y, 2), 0);
}

/**
 * A measure to check how asymmetric a market is. 
 * The index is logarithmic - 0.1 is a high asymmetry.
 */
export var asymmetryIndex = (arr: number[]) => {
    if (arr.reduce((a, b) => a + b, 0) > 1 || arr.reduce((a, b) => a + b, 0) < 0) {
        throw new Error("The Asymmetry index only works on an array of fraction of market shares")
    }
    return arr.reduce((a, b) => a + Math.pow(b - 1 / arr.length, 2), 0) / arr.length;
}