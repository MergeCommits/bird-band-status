import {
    InfoCodeDoesNotIncludeStatusCodeException,
    InfoCodeExcludesStatusCodeException,
} from "birdCodes/errors";
import { infoCodeInputDetails } from "birdCodes/infoCode/infoCodeDetails";
import type {
    InfoCode,
    InfoCodeInput,
} from "birdCodes/infoCode/validInfoCodes";
import type { BirdStatusCode } from "birdCodes/statusCode/validStatusCodes";

function getInputCodesThatAreNotAuxMarkers(): InfoCodeInput[] {
    return Object.entries(infoCodeInputDetails)
        .filter(
            ([, value]) =>
                value.category !== "Visual Aux Marker" &&
                value.category !== "Electronic Aux Marker"
        )
        .map(([key]) => Number(key) as InfoCodeInput);
}

function getAuxMarkers() {
    return Object.entries(infoCodeInputDetails)
        .filter(
            ([, value]) =>
                value.category === "Visual Aux Marker" ||
                value.category === "Electronic Aux Marker"
        )
        .map(([key]) => Number(key) as InfoCodeInput);
}

function getAuxVariantOfNonAuxMarker(code: InfoCodeInput): InfoCode {
    const candidate = infoCodeInputDetails[code].auxMarkerVariant;
    if (candidate) {
        return candidate;
    }

    throw new Error(`Info code "${code}" is an aux marker`);
}

export function getNonAuxMarkerVariant(code: InfoCode): InfoCodeInput | null {
    const nonAuxVariant = Object.entries(infoCodeInputDetails)
        .find(([, infoDetail]) => infoDetail.auxMarkerVariant === code)
        ?.map((key) => Number(key) as InfoCodeInput)[0];

    if (nonAuxVariant) {
        return nonAuxVariant;
    }

    return null;
}

function computeInfoCode(inputs: InfoCodeInput[]): InfoCode {
    if (inputs.length <= 0) {
        return 0;
    }

    if (inputs.length === 1) {
        const firstInputCode = inputs[0];
        if (!firstInputCode) {
            throw new Error("This should never happen");
        }
        return firstInputCode;
    }

    const allAuxMarkers = getAuxMarkers();
    if (inputs.every((input) => allAuxMarkers.includes(input))) {
        // 6 and 7 are the only aux markers that have a unique "this plus one or more other aux markers" code
        if (inputs.includes(6)) {
            return 29;
        }

        if (inputs.includes(7)) {
            return 30;
        }

        return 25;
    }

    const allNonAuxMarkers = getInputCodesThatAreNotAuxMarkers();
    const nonAuxInputs = inputs.filter((input) =>
        allNonAuxMarkers.includes(input)
    );
    if (nonAuxInputs.length === 1) {
        const nonAuxInput = nonAuxInputs[0];
        if (!nonAuxInput) {
            throw new Error("This should never happen");
        }
        return getAuxVariantOfNonAuxMarker(nonAuxInput);
    }

    return 85;
}

function getIncludeExcludeLists(infoCode: InfoCode): {
    onlyWith?: BirdStatusCode[];
    notWith?: BirdStatusCode[];
} {
    if (infoCode in infoCodeInputDetails) {
        const infoDetail = infoCodeInputDetails[infoCode as InfoCodeInput];

        return {
            onlyWith: infoDetail.onlyWith,
            notWith: infoDetail.notWith,
        };
    }

    const nonAuxVariant = getNonAuxMarkerVariant(infoCode);
    if (nonAuxVariant !== null) {
        const infoDetail = infoCodeInputDetails[nonAuxVariant];

        return {
            onlyWith: infoDetail.onlyWith,
            notWith: infoDetail.notWith,
        };
    }

    return {};
}

export function getInfoCode(
    statusCode: BirdStatusCode,
    inputs: InfoCodeInput[]
): InfoCode {
    const infoCode = computeInfoCode(inputs);

    const infoDetail = getIncludeExcludeLists(infoCode);

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
