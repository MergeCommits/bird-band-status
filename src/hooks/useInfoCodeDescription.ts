import { getOutputCodeDetails } from "birdCodes/infoCode/infoCodeDisplay";
import type {
    InfoCode,
    InfoCodeInput,
    OtherOutputInfoCode,
} from "birdCodes/infoCode/validInfoCodes";
import { MISSING_LONG_DESCRIPTION } from "components/ResultHeader";
import type { TFunction } from "i18next";
import { useMemo } from "react";

function useShortDescription(
    infoCodeDetails:
        | {
              code: InfoCodeInput & OtherOutputInfoCode;
              includesAuxiliaryMarker: false;
          }
        | { code: InfoCodeInput; includesAuxiliaryMarker: true }
        | null,
    t: TFunction<["common", "statusCode"]>
) {
    return useMemo(() => {
        if (infoCodeDetails === null) {
            return "";
        }

        const shortDescription = t(
            `statusCode:infoCode.${infoCodeDetails.code}.shortDescription`
        );

        if (infoCodeDetails.includesAuxiliaryMarker) {
            return (
                shortDescription +
                t("statusCode:infoCode.shortDescriptionAuxSuffix")
            );
        }

        return shortDescription;
    }, [infoCodeDetails, t]);
}

function useLongDescription(
    infoCodeDetails:
        | {
              code: InfoCodeInput & OtherOutputInfoCode;
              includesAuxiliaryMarker: false;
          }
        | { code: InfoCodeInput; includesAuxiliaryMarker: true }
        | null,
    t: TFunction<["common", "statusCode"]>
) {
    return useMemo(() => {
        if (infoCodeDetails === null) {
            return "";
        }

        const longDescription: string = t(
            `statusCode:infoCode.${infoCodeDetails.code}.longDescription`,
            MISSING_LONG_DESCRIPTION
        );

        if (
            infoCodeDetails.includesAuxiliaryMarker &&
            longDescription !== MISSING_LONG_DESCRIPTION
        ) {
            return (
                longDescription +
                t("statusCode:infoCode.longDescriptionAuxSuffix")
            );
        }

        return longDescription;
    }, [infoCodeDetails, t]);
}

export function useInfoCodeDescription(
    infoCode: InfoCode | null,
    t: TFunction<["common", "statusCode"]>
) {
    const infoCodeDetails =
        infoCode === null ? null : getOutputCodeDetails(infoCode);

    const shortDescription = useShortDescription(infoCodeDetails, t);
    const longDescription = useLongDescription(infoCodeDetails, t);

    return { shortDescription, longDescription };
}
