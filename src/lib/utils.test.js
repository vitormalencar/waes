import { getStringLengthDifference, findDiffPosition } from "./utils";

describe("Utils", () => {
  it("should sould return the differece split into the string", () => {
    const text = "Fooo";
    const state = "bar";

    expect(getStringLengthDifference(text, state)).toEqual(1);
  });
  it("should find the Diff Position", () => {
    const text = "Fooo";
    const state = "FooooBar";
    const sameState = text;
    expect(findDiffPosition(text, state)).toEqual(4);
    expect(findDiffPosition(text, sameState)).toEqual(null);
  });
});
