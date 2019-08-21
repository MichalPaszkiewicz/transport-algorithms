export class Economics{
    static herfindahl_hirschman_index(arr: number[]){
        var total = arr.reduce((x, y) => x + y,0);
        var marketShares = arr.map(x => x / total);
        return 	marketShares.reduce((x, y) => x + Math.pow(y,2), 0)
    }

    static normalised_herfindahl_index(arr: number[]){
        if(arr.length == 1){
            return 1;
        }
        var hhi = Economics.herfindahl_hirschman_index(arr);
        return (hhi - 1/arr.length)/(1 - 1/arr.length);        
    }

    static kwoka_dominance_index(arr: number[]){
        var total = 0;
        var sortedArr = arr.sort((x, y) => y - x);
        for(var i = 0; i < sortedArr.length - 1; i++){
            total += Math.pow(sortedArr[i] - sortedArr[i + 1], 2);
        }
        return total;
    }

    static garcia_alba_dominance_index(arr: number[]){
        var hhi = Economics.herfindahl_hirschman_index(arr);
        var total = arr.reduce((x, y) => x + y,0);
        var squaredFirmContributions = arr.map(x => Math.pow(x / total,2) / hhi);
        return squaredFirmContributions.reduce((x, y) => x + y, 0);
    }
}
