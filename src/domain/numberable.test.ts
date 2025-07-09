import { describe, expect, it } from "bun:test";
import { ApplicationStatusError } from "./error";
import { ClosedRange, LeftHalfOpenRange, NumberableConverter, OpenRange, RightHalfOpenRange } from "./numberable";

// Test Numberable implementation class
class TestNumberable {
  constructor(private readonly value: number) {}
  toNumber(): number {
    return this.value;
  }
}
describe("Numberable", () => {
  describe("NumberableConverter", () => {
    it("toNumber - should convert to number if value exists", () => {
      const numberable = new TestNumberable(42);
      expect(NumberableConverter.toNumber(numberable)).toBe(42);
    });
    it("toNumber - should return undefined if value is undefined", () => {
      expect(NumberableConverter.toNumber(undefined)).toBeUndefined();
    });
    it("toString - should convert to string if value exists", () => {
      const numberable = new TestNumberable(42);
      expect(NumberableConverter.toString(numberable)).toBe("42");
    });
    it("toString - should return undefined if value is undefined", () => {
      expect(NumberableConverter.toString(undefined)).toBeUndefined();
    });
    it("toStringFromArray - should convert to comma-separated string if value exists", async () => {
      const numberables = [new TestNumberable(1), new TestNumberable(2), new TestNumberable(3)];
      expect(await NumberableConverter.toStringFromArray(numberables)).toBe("1,2,3");
    });
    it("toStringFromArray - Separator can be specified", async () => {
      const numberables = [new TestNumberable(1), new TestNumberable(2), new TestNumberable(3)];
      expect(await NumberableConverter.toStringFromArray(numberables, "-")).toBe("1-2-3");
    });
    it("toStringFromArray - should return undefined if value is undefined", async () => {
      expect(await NumberableConverter.toStringFromArray(undefined)).toBeUndefined();
    });
    it("toStringFromArray - should return undefined if empty array", async () => {
      expect(await NumberableConverter.toStringFromArray([])).toBeUndefined();
    });
  });
  describe("Range", () => {
    it("should throw an error if min is greater than max", () => {
      expect(() => {
        new OpenRange(10, 5);
      }).toThrow(ApplicationStatusError);
    });
    describe("OpenRange", () => {
      it("should return true for values within the range", () => {
        const range = new OpenRange(1, 10);
        expect(range.isCover(5)).toBe(true);
      });
      it("should return false for boundary values", () => {
        const range = new OpenRange(1, 10);
        expect(range.isCover(1)).toBe(false);
        expect(range.isCover(10)).toBe(false);
      });
      it("should return false for values outside the range", () => {
        const range = new OpenRange(1, 10);
        expect(range.isCover(0)).toBe(false);
        expect(range.isCover(11)).toBe(false);
      });
    });
    describe("RightHalfOpenRange", () => {
      it("should return true for values within the range", () => {
        const range = new RightHalfOpenRange(1, 10);
        expect(range.isCover(5)).toBe(true);
      });
      it("should return true for the left boundary value", () => {
        const range = new RightHalfOpenRange(1, 10);
        expect(range.isCover(1)).toBe(true);
      });
      it("should return false for the right boundary value", () => {
        const range = new RightHalfOpenRange(1, 10);
        expect(range.isCover(10)).toBe(false);
      });
      it("should return false for values outside the range", () => {
        const range = new RightHalfOpenRange(1, 10);
        expect(range.isCover(0)).toBe(false);
        expect(range.isCover(11)).toBe(false);
      });
    });
    describe("LeftHalfOpenRange", () => {
      it("should return true for values within the range", () => {
        const range = new LeftHalfOpenRange(1, 10);
        expect(range.isCover(5)).toBe(true);
      });
      it("should return false for the left boundary value", () => {
        const range = new LeftHalfOpenRange(1, 10);
        expect(range.isCover(1)).toBe(false);
      });
      it("should return true for the right boundary value", () => {
        const range = new LeftHalfOpenRange(1, 10);
        expect(range.isCover(10)).toBe(true);
      });
      it("should return false for values outside the range", () => {
        const range = new LeftHalfOpenRange(1, 10);
        expect(range.isCover(0)).toBe(false);
        expect(range.isCover(11)).toBe(false);
      });
    });
    describe("ClosedRange", () => {
      it("should return true for values within the range", () => {
        const range = new ClosedRange(1, 10);
        expect(range.isCover(5)).toBe(true);
      });
      it("should return true for boundary values", () => {
        const range = new ClosedRange(1, 10);
        expect(range.isCover(1)).toBe(true);
        expect(range.isCover(10)).toBe(true);
      });
      it("should return false for values outside the range", () => {
        const range = new ClosedRange(1, 10);
        expect(range.isCover(0)).toBe(false);
        expect(range.isCover(11)).toBe(false);
      });
    });
  });
});