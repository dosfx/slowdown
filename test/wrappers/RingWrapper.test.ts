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
    })

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
    ])("%i% ring path %i width", (percent: number, width: number, expected: string) => {
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


// const d = ["M 50", this.center - this.radius];
//         const rad = (percent / 50) * Math.PI;
//         if (percent < 50) {
//             d.push("A", this.radius, this.radius, 0, 0, 1, this.center + (this.radius * Math.sin(rad)), this.center - (this.radius * Math.cos(rad)));