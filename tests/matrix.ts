import * as transportLib from "../src/index";

test("matrix multiplication gives correct value for identity matrices", () => {
    var identity1 = transportLib.Matrix.identity(10);
    var identity2 = transportLib.Matrix.identity(10);
    var testIdentity = transportLib.Matrix.identity(10);

    expect(transportLib.Matrix.equals(transportLib.Matrix.times(identity1, identity2), testIdentity)).toBeTruthy();

});