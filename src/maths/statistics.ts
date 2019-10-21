const asc = arr => arr.sort((a, b) => a - b);

export var sum = (arr: number[]) => arr.reduce((a,b) => a + b, 0);

export var mean = (arr: number[]) => {
    return  sum(arr) / arr.length;
}

// sample standard deviation
export var standardDeviation = (arr: number[]) => {
    const mu = mean(arr);
    const diffArr = arr.map(a => (a - mu) ** 2);
    return Math.sqrt(sum(diffArr) / (arr.length - 1));
};

export var quantile = (arr: number[], q: number) => {
    const sorted = asc(arr);
    const pos = ((sorted.length) - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    if ((sorted[base + 1] !== undefined)) {
        return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
    } else {
        return sorted[base];
    }
};

export var lowerQuartile = (arr: number[]) => quantile(arr, 0.25);

export var median = (arr: number[]) => quantile(arr, 0.5);

export var upperQuartile = (arr: number[]) => quantile(arr, 0.75);