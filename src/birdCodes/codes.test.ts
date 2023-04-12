import {
    InfoCodeDoesNotIncludeStatusCodeException,
    InfoCodeExcludesStatusCodeException,
} from "birdCodes/errors";
import { getInfoCode } from "birdCodes/infoCode/infoCodeLogic";
import { describe, expect, it } from "vitest";

describe("basic codes", () => {
    it("should output the info code 0 when no inputs are provided", () => {
        expect(getInfoCode(2, [])).toEqual(0);
    });

    it("should output the provided input code when only one is given", () => {
        expect(getInfoCode(2, [1])).toEqual(1);
    });

    it("should output an aux variant code when there is only one non-aux and one or multiple aux markers", () => {
        expect(getInfoCode(2, [18, 81])).toEqual(19);
        expect(getInfoCode(2, [18, 81, 90])).toEqual(19);
    });

    it("should output 85 when there's one or", () => {
        expect(getInfoCode(3, [18, 70])).toEqual(85);
        expect(getInfoCode(3, [18, 70, 87])).toEqual(85);
    });
});

describe("inclusion/exclusion exceptions", () => {
    it("should throw the correct exception when a status code is used with an info code that does not include it", () => {
        const t = () => getInfoCode(2, [3]);
        expect(t).toThrow(InfoCodeDoesNotIncludeStatusCodeException);
        expect(t).toThrow(
            'Status code "2" is not valid with info code "03": Info code does not include the given status code'
        );
    });

    it("should throw the correct exception when a status code is used with an info code that excludes it", () => {
        const t = () => getInfoCode(7, [18]);
        expect(t).toThrow(InfoCodeExcludesStatusCodeException);
        expect(t).toThrow(
            'Status code "7" is not valid with info code "18": Info code excludes the given status code'
        );
    });
});

describe("other miscellaneous cases", () => {
    it("385", () => {
        expect(getInfoCode(3, [14, 18])).toEqual(85);
    });

    it("325", () => {
        expect(getInfoCode(3, [2, 80])).toEqual(25);
    });
});
