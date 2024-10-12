import { afterEach, beforeEach, describe, expect, test } from "@jest/globals"
import { TimeWrapper } from "../../src/wrappers/TimeWrapper";

describe("TimeWrapper", () => {
    let timeElement: HTMLDivElement;
    let timeWrapper: TimeWrapper;

    beforeEach(() => {
        timeElement = document.createElement("div");
        timeElement.className = "time";
        document.body.appendChild(timeElement);
        timeWrapper = new TimeWrapper(".time");
    });

    afterEach(() => {
        timeElement.remove();
    });

    test("0 seconds", () => {
        timeWrapper.setTime(0);
        expect(timeElement.textContent).toBe("00:00");
    });

    test("10 seconds", () => {
        timeWrapper.setTime(10);
        expect(timeElement.textContent).toBe("00:10");
    });

    test("15 seconds", () => {
        timeWrapper.setTime(15);
        expect(timeElement.textContent).toBe("00:15");
    });

    test("20 seconds", () => {
        timeWrapper.setTime(20);
        expect(timeElement.textContent).toBe("00:20");
    });

    test("30 seconds", () => {
        timeWrapper.setTime(30);
        expect(timeElement.textContent).toBe("00:30");
    });

    test("40 seconds", () => {
        timeWrapper.setTime(40);
        expect(timeElement.textContent).toBe("00:40");
    });

    test("50 seconds", () => {
        timeWrapper.setTime(50);
        expect(timeElement.textContent).toBe("00:50");
    });

    test("60 seconds", () => {
        timeWrapper.setTime(60);
        expect(timeElement.textContent).toBe("01:00");
    });

    test("mass check", () => {
        for (let sec = 0; sec < 60; sec++) {
            for (let min = 0; sec < 60; sec++) {
                timeWrapper.setTime((min * 60) + sec);
                expect(timeElement.textContent).toBe(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
            }
        }
    });

    test("negative", () => {
        timeWrapper.setTime(-1);
        expect(timeElement.textContent).toBe("00:00");
    });

    test("large minutes", () => {
        timeWrapper.setTime(6000);
        expect(timeElement.textContent).toBe("99:59");
    });
});