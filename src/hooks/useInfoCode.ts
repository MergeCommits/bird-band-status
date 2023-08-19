import {
    InfoCodeDoesNotIncludeStatusCodeException,
    InfoCodeExcludesStatusCodeException,
} from "birdCodes/errors";
import { displayInfoCode } from "birdCodes/infoCode/infoCodeDisplay";
import { getInfoCode } from "birdCodes/infoCode/infoCodeLogic";
import type {
    InfoCode,
    InfoCodeInput,
} from "birdCodes/infoCode/validInfoCodes";
import type { BirdStatusCode } from "birdCodes/statusCode/validStatusCodes";
import type { TFunction } from "i18next";
import { useMemo } from "react";

export function useInfoCode(
    statusCode: BirdStatusCode,
    inputs: InfoCodeInput[],
    t: TFunction<["common", "statusCode"]>
) {
    return useMemo<[InfoCode, ""] | [null, string]>(() => {
        try {
            return [getInfoCode(statusCode, inputs), ""];
        } catch (e) {
            if (e instanceof InfoCodeDoesNotIncludeStatusCodeException) {
                return [
                    null,
                    `${t("error.mismatchCodes", {
                        statusCode: e.statusCode,
                        infoCode: displayInfoCode(e.infoCode),
                    })} ${t("error.infoCodeDoesNotInclude")}`,
                ];
            } else if (e instanceof InfoCodeExcludesStatusCodeException) {
                return [
                    null,
                    `${t("error.mismatchCodes", {
                        statusCode: e.statusCode,
                        infoCode: displayInfoCode(e.infoCode),
                    })} ${t("error.infoCodeExcludes")}`,
                ];
            } else {
                return [null, t("error.unknown")];
            }
        }
    }, [statusCode, inputs, t]);
}
