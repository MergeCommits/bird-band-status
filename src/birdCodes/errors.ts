import { displayInfoCode } from "birdCodes/infoCode/infoCodeDisplay";
import type { InfoCode } from "birdCodes/infoCode/validInfoCodes";
import type { BirdStatusCode } from "birdCodes/statusCode/validStatusCodes";

class BirdStatusInfoCodeMismatchException extends Error {
    public constructor(
        message: string,
        statusCode: BirdStatusCode,
        infoCode: InfoCode
    ) {
        super(
            `Status code "${statusCode}" is not valid with info code "${displayInfoCode(
                infoCode
            )}": ${message}`
        );
        this.name = "BirdStatusInfoCodeMismatchException";
    }
}

class InfoCodeDoesNotIncludeStatusCodeException extends BirdStatusInfoCodeMismatchException {
    public constructor(statusCode: BirdStatusCode, infoCode: InfoCode) {
        super(
            "Info code does not include the given status code",
            statusCode,
            infoCode
        );
        this.name = "InfoCodeDoesNotIncludeStatusCodeException";
    }
}

class InfoCodeExcludesStatusCodeException extends BirdStatusInfoCodeMismatchException {
    public constructor(statusCode: BirdStatusCode, infoCode: InfoCode) {
        super("Info code excludes the given status code", statusCode, infoCode);
        this.name = "InfoCodeExcludesStatusCodeException";
    }
}

export {
    InfoCodeDoesNotIncludeStatusCodeException,
    InfoCodeExcludesStatusCodeException,
};
