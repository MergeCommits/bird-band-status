import {
    InfoCodeDoesNotIncludeStatusCodeException,
    InfoCodeExcludesStatusCodeException,
} from "birdCodes/Errors";
import { getDisplayInfoCodeDescription } from "birdCodes/infoCode/InfoCodeDisplay";
import type {
    InfoCode,
    InfoInputCode,
} from "birdCodes/infoCode/ValidInfoCodes";
import type { BirdStatusCode } from "birdCodes/statusCode/ValidStatusCodes";

function computeInfoCode(inputs: InfoInputCode[]): InfoCode {
    if (inputs.length <= 0) {
        return 0;
    }

    if (inputs.length === 1) {
        return inputs[0];
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
