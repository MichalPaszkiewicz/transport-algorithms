import * as transportLib from "../src/index";

test("calculation of expected arrival time works in naive case", () => {
    for(var i = 0; i < 1000; i++){
        var num = Math.floor(100000 * Math.random());
        expect(transportLib.Scheduling.averageWaitingTime(num, 0)).toBe(num / 2);
    }
});