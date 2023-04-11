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

function computeInfoCode(inputs: InfoInputCode[]): InfoCode {
    if (inputs.length <= 0) {
        return 0;
    }

    if (inputs.length === 1) {
        return inputs[0];
    }

    // const auxMarkers =

    // const multipleAuxOnly = 25

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
