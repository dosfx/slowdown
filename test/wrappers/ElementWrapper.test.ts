import { describe, expect, test } from "@jest/globals";
import { ElementWrapper } from "../../src/wrappers/ElementWrapper";

class TestWrapper extends ElementWrapper { }

describe("ElementWrapper", () => {
    test("no element", () => {
        expect(() => new TestWrapper("notanelement")).toThrow(`Couldn't initialize wrapper: "notanelement" not found`);
    });
});