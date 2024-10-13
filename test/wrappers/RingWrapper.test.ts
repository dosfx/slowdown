import { afterEach, beforeEach, describe, expect, test } from "@jest/globals";
import { RingWrapper } from "../../src/wrappers/RingWrapper";

describe("RingWrapper", () => {
    let element: HTMLDivElement;

    beforeEach(() => {
        element = document.createElement("div");
        element.className = "ring";
        document.body.appendChild(element);
    });

    afterEach(() => {
        element.remove();
    });

    test.each([
        [0, 50, 0],
        [90, 100, 50],
        [180, 50, 100],
        [270, 0, 50],
        [360, 50, 0],
    ])("getCoord(%i) == [%i, %i]", (deg, expectedX, expectedY) => {
        const wrapper = new RingWrapper(".ring");
        const toRad = (deg: number) => (deg * Math.PI) / 180;
        const [x, y] = wrapper.getCoords(50, toRad(deg));
        expect(x).toBeCloseTo(expectedX);
        expect(y).toBeCloseTo(expectedY);
    });

    test.each([
        [50, 0, 0],
        [100, 0, 45],
        [100, 50, 90],
        [100, 100, 135],
        [50, 100, 180],
        [0, 100, 225],
        [0, 50, 270],
        [0, 0, 315],
    ])("getRad(%i, %i) == %i degress", (x, y, deg) => {
        const wrapper = new RingWrapper(".ring");
        const toDeg = (rad: number) => ((rad * (180 / Math.PI)) + 360) % 360;
        expect(toDeg(wrapper.getRad(x, y))).toBeCloseTo(deg)
    });

    test("getScaledCoords", () => {
        document.body.style.width = "200px";
        const wrapper = new RingWrapper(".ring");
        const [x, y] = wrapper.getScaledCoords({ offsetX: 100, offsetY: 100 } as MouseEvent);
        expect(x).toBe(50);
        expect(y).toBe(50);
    });

    test.each([
        [0, 8, "M 50 5 A 45 45 0 0 1 50 5"],
        [25, 8, "M 50 5 A 45 45 0 0 1 95 50"],
        [50, 8, "M 50 5 A 45 45 0 0 1 50 95"],
        [75, 8, "M 50 5 A 45 45 0 0 1 50 95 A 45 45 0 0 1 5 50"],
        [100, 8, "M 50 5 A 45 45 0 0 1 50 95 A 45 45 0 0 1 50 5"],
        [0, 12, "M 50 7 A 43 43 0 0 1 50 7"],
        [25, 12, "M 50 7 A 43 43 0 0 1 93 50"],
        [50, 12, "M 50 7 A 43 43 0 0 1 50 93"],
        [75, 12, "M 50 7 A 43 43 0 0 1 50 93 A 43 43 0 0 1 7 50"],
        [100, 12, "M 50 7 A 43 43 0 0 1 50 93 A 43 43 0 0 1 50 7"],
        [-1, 8, "M 50 5 A 45 45 0 0 1 50 5"],
        [101, 8, "M 50 5 A 45 45 0 0 1 50 95 A 45 45 0 0 1 50 5"],
    ])("setPercent(%i) %i width", (percent: number, width: number, expected: string) => {
        element.style.strokeWidth = width + "px";
        const wrapper = new RingWrapper(".ring");
        wrapper.setPercent(percent);
        const d = element.getAttribute("d").split(" ");
        const expectedArr = expected.split(" ");
        for (let i = 0; i < d.length; i++) {
            const num = Number(d[i]);
            if (isNaN(num)) {
                expect(d[i]).toBe(expectedArr[i]);
            } else {
                expect(num).toBeCloseTo(Number(expectedArr[i]));
            }
        }
    });
});
