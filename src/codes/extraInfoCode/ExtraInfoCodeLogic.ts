import type { BirdStatusCode } from "codes/birdStatusCodes/ValidBirdCodes";
import type { ExtraInfoCodeDescription } from "codes/extraInfoCode/ExtraInfoCodeDetails";
import type { ExtraInfoCode } from "codes/extraInfoCode/ValidExtraInfoCodes";

function getAdditionalInformationCode(
    birdStatusCode: BirdStatusCode
): ExtraInfoCode {
    return 0;
}

export function displayExtraInfoCode(code: ExtraInfoCode): string {
    return code.toString().padStart(2, "0");
}

function buildAuxiliaryVariant(
    info: ExtraInfoCodeDescription
): ExtraInfoCodeDescription {
    return {
        shortDescription: `${info.shortDescription}, plus one or more auxiliary markers used`,
        longDescription: `${info.longDescription} All markers must be described in marker-related fields. Approval from the appropriate Banding Office is needed for auxiliary markers.`,
        onlyWith: info.onlyWith,
        notWith: info.notWith,
    };
}
