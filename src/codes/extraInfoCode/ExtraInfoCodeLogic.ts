import type { BirdStatusCode } from "codes/birdStatusCodes/ValidBirdCodes";
import type { ExtraInfoCode } from "codes/extraInfoCode/ValidExtraInfoCodes";

function getAdditionalInformationCode(
    birdStatusCode: BirdStatusCode
): ExtraInfoCode {
    return 0;
}

// include two digits: 0 -> 00
export function displayExtraInfoCode(code: ExtraInfoCode): string {
    return code.toString().padStart(2, "0");
}
