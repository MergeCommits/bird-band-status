import {
    InfoCodeDoesNotIncludeStatusCodeException,
    InfoCodeExcludesStatusCodeException,
} from "birdCodes/Errors";
import { getInfoCode } from "birdCodes/infoCode/InfoCodeLogic";
import { describe, expect, it } from "vitest";

describe("basic codes", () => {
    it("should output the info code 0 when no inputs are provided", () => {
        expect(getInfoCode(2, [])).toEqual(0);
    });

    it("should output the provided input code when only one is given", () => {
        expect(getInfoCode(2, [1])).toEqual(1);
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

describe("work with aux markers", () => {
    it.skip("should output the correct code when there are only two auxiliary markers", () => {
        expect(false);
    });
});
