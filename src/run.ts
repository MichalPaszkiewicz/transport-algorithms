import * as Economics from "./economics";
import * as Scheduling from "./scheduling";
import {scatterPlot} from "./chart";

var indices = [];
var results = [];
var titles = ["hhi", "hhi 3", "normalised hhi", "nhhi 3", "nnhi 2|0", "Kwoka Dominance", "kd 3", "kd 2|0", "Garcia Alba D", "gad 3", "Asymmetry Index", "ai 3"];

for(var i = 0; i < 100; i++){
    indices.push(i);
    results.push(
        [
            Economics.herfindahlHirschmanIndex([i / 100, 1 - i/100]),
            Economics.herfindahlHirschmanIndex([i / 100, (1 - i/100) / 2, (1 - i/100) / 2]),            
            Economics.normalisedHerfindahlIndex([i / 100, 1 - i/100]),
            Economics.normalisedHerfindahlIndex([i / 100, (1 - i/100) / 2, (1 - i/100) / 2]),  
            Economics.normalisedHerfindahlIndex([i/100, (1 - i /100), 0]),        
            Economics.kwokaDominanceIndex([i/100, 1 - i/100]),
            Economics.kwokaDominanceIndex([i/100,  (1 - i/100) / 2, (1 - i/100) / 2]),   
            Economics.kwokaDominanceIndex([i/100, (1 - i /100), 0]),
            Economics.garciaAlbaDominanceIndex([i/ 100, 1 - i/100]),
            Economics.garciaAlbaDominanceIndex([i/ 100,  (1 - i/100) / 2, (1 - i/100) / 2]),            
            Economics.asymmetryIndex([i/100, 1 - i/100]),
            Economics.asymmetryIndex([i/100,  (1 - i/100) / 2, (1 - i/100) / 2]),
        ]);
}

for(var i = 0; i < results[0].length; i++){
    scatterPlot(indices, results.map(r => r[i]), "first company share %", titles[i], null, 0.8, 0.3);
}