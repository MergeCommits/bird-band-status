import {
    InfoCodeDoesNotIncludeStatusCodeException,
    InfoCodeExcludesStatusCodeException,
} from "birdCodes/Errors";
import type { InfoCodeDescriptionWithBling } from "birdCodes/infoCode/InfoCodeDetails";
import { infoCodeDetails } from "birdCodes/infoCode/InfoCodeDetails";
import { getDisplayInfoCodeDescription } from "birdCodes/infoCode/InfoCodeDisplay";
import type {
    InfoCode,
    InfoInputCode,
} from "birdCodes/infoCode/ValidInfoCodes";
import { infoInputCodes } from "birdCodes/infoCode/ValidInfoCodes";
import type { BirdStatusCode } from "birdCodes/statusCode/ValidStatusCodes";
import { getObjectEntriesAsArray } from "utils/ObjectUtils";

function getInputCodesThatAreNotAuxMarkers(): InfoInputCode[] {
    return infoInputCodes.filter((code) => {
        const blingEntries = (
            getObjectEntriesAsArray(infoCodeDetails).filter(
                (detail) => "bling" in detail
            ) as InfoCodeDescriptionWithBling[]
        ).map((detail) => detail.bling);

        return blingEntries.includes(code);
    });
}

function getAuxMarkers() {
    return infoInputCodes.filter(
        (code) => !getInputCodesThatAreNotAuxMarkers().includes(code)
    );
}

function getAuxVariantOfNonAuxMarker(
    nonAuxMarker: InfoInputCode
): InfoInputCode {
    for (const [key, value] of Object.entries(infoCodeDetails)) {
        if ("bling" in value && value.bling === nonAuxMarker) {
            return Number(key) as InfoInputCode;
        }
    }

    throw new Error(
        `Could not find aux variant of non-aux marker ${nonAuxMarker}`
    );
}

function computeInfoCode(inputs: InfoInputCode[]): InfoCode {
    if (inputs.length <= 0) {
        return 0;
    }

    if (inputs.length === 1) {
        return inputs[0];
    }

    const allAuxMarkers = getAuxMarkers();
    if (inputs.every((input) => allAuxMarkers.includes(input))) {
        return 25;
    }

    const allNonAuxMarkers = getInputCodesThatAreNotAuxMarkers();
    const nonAuxInputs = inputs.filter((input) =>
        allNonAuxMarkers.includes(input)
    );
    if (nonAuxInputs.length === 1) {
        const nonAuxInput = nonAuxInputs[0];
        return getAuxVariantOfNonAuxMarker(nonAuxInput);
    }

    return 85;
}

export function getInfoCode(
    statusCode: BirdStatusCode,
    inputs: InfoInputCode[]
): InfoCode {
    const infoCode = computeInfoCode(inputs);
    const infoDetail = getDisplayInfoCodeDescription()[infoCode];

    if (infoDetail.onlyWith && !infoDetail.onlyWith.includes(statusCode)) {
        throw new InfoCodeDoesNotIncludeStatusCodeException(
            statusCode,
            infoCode
        );
    }

    if (infoDetail.notWith && infoDetail.notWith.includes(statusCode)) {
        throw new InfoCodeExcludesStatusCodeException(statusCode, infoCode);
    }

    return infoCode;
}
