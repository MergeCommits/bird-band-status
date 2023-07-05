import { displayInfoCode } from "birdCodes/infoCode/infoCodeDisplay";
import type { InfoCode } from "birdCodes/infoCode/validInfoCodes";
import type { BirdStatusCode } from "birdCodes/statusCode/validStatusCodes";

class BirdStatusInfoCodeMismatchException extends Error {
    public readonly statusCode: BirdStatusCode;
    public readonly infoCode: InfoCode;
    public constructor(statusCode: BirdStatusCode, infoCode: InfoCode) {
        super(
            `Status code "${statusCode}" is not valid with info code "${displayInfoCode(
                infoCode
            )}"`
        );
        this.name = "BirdStatusInfoCodeMismatchException";
        this.statusCode = statusCode;
        this.infoCode = infoCode;
    }
}

class InfoCodeDoesNotIncludeStatusCodeException extends BirdStatusInfoCodeMismatchException {
    public constructor(statusCode: BirdStatusCode, infoCode: InfoCode) {
        super(statusCode, infoCode);
        this.name = "InfoCodeDoesNotIncludeStatusCodeException";
    }
}

class InfoCodeExcludesStatusCodeException extends BirdStatusInfoCodeMismatchException {
    public constructor(statusCode: BirdStatusCode, infoCode: InfoCode) {
        super(statusCode, infoCode);
        this.name = "InfoCodeExcludesStatusCodeException";
    }
}

export {
    InfoCodeDoesNotIncludeStatusCodeException,
    InfoCodeExcludesStatusCodeException,
};
