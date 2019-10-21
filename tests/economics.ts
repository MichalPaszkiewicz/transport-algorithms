import * as transportLib from "../src/index";

test("competitiveness index gives correct value for a monopoly", () => {
    var result = transportLib.Economics.competitivenessIndex([[1]], [1], 0);

    expect(result).toBe(0);
});

test("competitiveness index gives correct value for a two way oligopoly", () => {
    var result = transportLib.Economics.competitivenessIndex([[1, 1], [1, 1]], [1, 0], 0);

    expect(result).toBe(0.5);
});

test("competitiveness index gives correct value for a three way oligopoly", () => {
    var result = transportLib.Economics.competitivenessIndex([[1, 1], [1, 1], [1, 1]], [1, 0], 0);

    expect(result).toBeCloseTo(2/3, 0.0001);
});

test("competitiveness index gives correct value for a two way market, split by preference", () => {
    var result = transportLib.Economics.competitivenessIndex([[1, 0], [0, 1]], [0.5, 0.5], 0);

    expect(result).toBe(0.5);
});

test("competitiveness indices give correct value for 5 way market", () => {
    var result = transportLib.Economics.competitivenessIndices([[1],[2],[3],[4],[5]], [1]);

    expect(result).toMatchSnapshot();
});

test("h-h index gives correct value for monopoly", () => {
    var result = transportLib.Economics.herfindahlHirschmanIndex([1]);

    expect(result).toBe(1);
});

test("h-h index gives correct value for two-way oligopoly", () => {
    var result = transportLib.Economics.herfindahlHirschmanIndex([1, 1]);

    expect(result).toBe(0.5);
});

test("n-h-h index gives correct value for monopoly", () => {
    var result = transportLib.Economics.normalisedHerfindahlIndex([1]);

    expect(result).toBe(1);
});

test("n-h-h index gives correct value for two-way oligopoly", () => {
    var result = transportLib.Economics.normalisedHerfindahlIndex([1, 1]);

    expect(result).toBe(0);
});

test("kwoka dominance index gives correct value for monopoly", () => {
    var result = transportLib.Economics.kwokaDominanceIndex([1,0]);

    expect(result).toBe(1);
});

test("kwoka dominance index gives correct value for two-way oligopoly", () => {
    var result = transportLib.Economics.kwokaDominanceIndex([0.5, 0.5]);

    expect(result).toBe(0);
});

test("kwoka dominance index gives correct value for a double dominance", () => {
    var result = transportLib.Economics.kwokaDominanceIndex([2/3, 1/3]);

    expect(result).toBeCloseTo(0.1111, 0.0001);
});


test("Garcia Alba Dominance index gives correct value for monopoly", () => {
    var result = transportLib.Economics.garciaAlbaDominanceIndex([1,0]);

    expect(result).toBe(1);
});

test("Garcia Alba Dominance index gives correct value for two-way oligopoly", () => {
    var result = transportLib.Economics.garciaAlbaDominanceIndex([0.5, 0.5]);

    expect(result).toBe(0.5);
});

test("Garcia Alba Dominance index gives correct value for a double dominance", () => {
    var result = transportLib.Economics.garciaAlbaDominanceIndex([2/3, 1/3]);

    expect(result).toBeCloseTo(0.6799, 0.0001);
});

test("Asymmetry index gives correct value for monopoly", () => {
    var result = transportLib.Economics.asymmetryIndex([1]);

    expect(result).toBe(0);
});

test("Asymmetry index gives correct value for two way oligopoly", () => {
    var result = transportLib.Economics.asymmetryIndex([0.5, 0.5]);

    expect(result).toBe(0);
});

test("Asymmetry index gives correct value for high asymmetry", () => {
    var result = transportLib.Economics.asymmetryIndex([1, 0]);

    expect(result).toBe(0.25);
});