import type { InfoCategory } from "birdCodes/infoCode/infoCategories";
import {
    infoCodeInputDetails,
    nonInputInfoCodeDetails,
} from "birdCodes/infoCode/infoCodeDetails";
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
    shortDescription: string;
    longDescription?: string;
    category: InfoCategory;
}[] {
    return Object.entries(infoCodeInputDetails).map(([key, value]) => ({
        code: Number(key) as InfoCodeInput,
        shortDescription: value.shortDescription,
        longDescription: value.longDescription,
        category: value.category,
    }));
}

export function getOutputCodeDetails(code: InfoCode): {
    shortDescription: string;
    longDescription?: string;
} {
    if (code in infoCodeInputDetails) {
        return infoCodeInputDetails[code as InfoCodeInput];
    }

    const nonAuxMarkerVariant = getNonAuxMarkerVariant(code);
    if (nonAuxMarkerVariant !== null) {
        const info = infoCodeInputDetails[nonAuxMarkerVariant];
        return {
            shortDescription: `${info.shortDescription}, plus one or more auxiliary markers used`,
            longDescription: `${info.longDescription} All markers must be described in marker-related fields.`,
        };
    }

    const other = nonInputInfoCodeDetails[code];

    return {
        shortDescription: other.shortDescription,
        longDescription: other.longDescription,
    };
}