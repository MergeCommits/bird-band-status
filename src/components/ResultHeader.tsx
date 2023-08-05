import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import {
    InfoCodeDoesNotIncludeStatusCodeException,
    InfoCodeExcludesStatusCodeException,
} from "birdCodes/errors";
import {
    displayInfoCode,
    getOutputCodeDetails,
} from "birdCodes/infoCode/infoCodeDisplay";
import { getInfoCode } from "birdCodes/infoCode/infoCodeLogic";
import type { InfoCodeInput } from "birdCodes/infoCode/validInfoCodes";
import type { BirdStatusCode } from "birdCodes/statusCode/validStatusCodes";
import type { TFunction } from "i18next";
import { useTranslation } from "next-i18next";
import { useMemo, useState } from "react";

function useInfoCodeDetails(
    statusCode: BirdStatusCode,
    inputCodes: InfoCodeInput[],
    t: TFunction<["common", "statusCode"]>
): [ReturnType<typeof getOutputCodeDetails> | null, string] {
    return useMemo(() => {
        try {
            const infoCode = getInfoCode(statusCode, inputCodes);
            return [getOutputCodeDetails(infoCode), ""];
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
    }, [statusCode, inputCodes, t]);
}

type Props = {
    statusCode: BirdStatusCode;
    infoCodes: InfoCodeInput[];
};

export const MISSING_LONG_DESCRIPTION = "missing";

export function ResultHeader(props: Props) {
    const { t } = useTranslation(["common", "statusCode"]);
    const [expandDescription, setExpandDescription] = useState(false);

    const [infoCodeDetails, errorMessage] = useInfoCodeDetails(
        props.statusCode,
        props.infoCodes,
        t
    );

    const shortDescription = useMemo(() => {
        if (infoCodeDetails === null) {
            return "infoCodeDetails is null";
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

    const longDescription = useMemo(() => {
        if (infoCodeDetails === null) {
            return "infoCodeDetails is null";
        }

        const longDescription: string = t(
            `statusCode:infoCode.${infoCodeDetails.code}.longDescription`,
            MISSING_LONG_DESCRIPTION
        );

        if (infoCodeDetails.includesAuxiliaryMarker) {
            if (longDescription !== MISSING_LONG_DESCRIPTION) {
                return `${longDescription} ${t(
                    "statusCode:infoCode.longDescriptionAuxSuffix"
                )}`;
            }
        }

        return longDescription;
    }, [infoCodeDetails, t]);

    return (
        <div
            className={
                "mb-8 flex w-full max-w-4xl flex-col items-center rounded-lg bg-secondary p-4"
            }
        >
            {infoCodeDetails === null ? (
                <p className={"text-red-800"}>{errorMessage}</p>
            ) : (
                <>
                    <h1 className={"text-8xl"}>
                        {`${props.statusCode}${displayInfoCode(
                            infoCodeDetails.code
                        )}`}
                    </h1>
                    <button
                        className={
                            "self-center px-2 py-0.5 text-xs uppercase leading-normal text-white focus:outline-none focus:ring-0"
                        }
                        onClick={() => {
                            setExpandDescription((prev) => !prev);
                        }}
                    >
                        <div className={"flex justify-center"}>
                            {expandDescription ? (
                                <>
                                    {t("hideDescription")}
                                    <ChevronUpIcon className={"h-5 w-5"} />
                                </>
                            ) : (
                                <>
                                    {t("showDescription")}
                                    <ChevronDownIcon className={"h-5 w-5"} />
                                </>
                            )}
                        </div>
                    </button>
                    {expandDescription && (
                        <p>
                            <span className={"font-bold"}>
                                {shortDescription}
                            </span>
                            {longDescription !== MISSING_LONG_DESCRIPTION && (
                                <>
                                    <br />
                                    {longDescription}
                                </>
                            )}
                        </p>
                    )}
                </>
            )}
        </div>
    );
}
