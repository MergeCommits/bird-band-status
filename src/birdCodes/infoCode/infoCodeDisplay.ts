import type { InfoCategory } from "birdCodes/infoCode/infoCategories";
import { infoCodeInputDetails } from "birdCodes/infoCode/infoCodeDetails";
import { getNonAuxMarkerVariant } from "birdCodes/infoCode/infoCodeLogic";
import type {
    InfoCode,
    InfoCodeInput,
} from "birdCodes/infoCode/validInfoCodes";

export function displayInfoCode(code: InfoCode): string {
    return code.toString().padStart(2, "0");
}

export function getDetailsOfInfoCodeInputs(): {
    code: InfoCodeInput;
    category: InfoCategory;
}[] {
    return Object.entries(infoCodeInputDetails).map(([key, value]) => ({
        code: Number(key) as InfoCodeInput,
        category: value.category,
    }));
}

export function getOutputCodeDetails(code: InfoCode): {
    code: InfoCode;
    nonAuxMarkerVariant?: InfoCodeInput;
} {
    if (code in infoCodeInputDetails) {
        return {
            code,
        };
    }

    const nonAuxMarkerVariant = getNonAuxMarkerVariant(code);
    if (nonAuxMarkerVariant !== null) {
        return {
            code,
            nonAuxMarkerVariant,
        };
    }

    return {
        code,
    };
}
