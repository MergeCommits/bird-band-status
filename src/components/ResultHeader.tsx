import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { displayInfoCode } from "birdCodes/infoCode/infoCodeDisplay";
import type { InfoCodeInput } from "birdCodes/infoCode/validInfoCodes";
import type { BirdStatusCode } from "birdCodes/statusCode/validStatusCodes";
import { useInfoCode } from "hooks/useInfoCode";
import { useInfoCodeDescription } from "hooks/useInfoCodeDescription";
import { useTranslation } from "next-i18next";
import { useState } from "react";

type Props = {
    statusCode: BirdStatusCode;
    infoCodes: InfoCodeInput[];
};

export const MISSING_LONG_DESCRIPTION = "missing";

export function ResultHeader(props: Props) {
    const { t } = useTranslation(["common", "statusCode"]);
    const [expandDescription, setExpandDescription] = useState(false);

    const [infoCode, errorMessage] = useInfoCode(
        props.statusCode,
        props.infoCodes,
        t
    );

    const { shortDescription, longDescription } = useInfoCodeDescription(
        infoCode,
        t
    );

    return (
        <div
            className={
                "mb-8 flex w-full max-w-4xl flex-col items-center rounded-lg bg-secondary p-4"
            }
        >
            {infoCode === null ? (
                <p className={"text-red-800"}>{errorMessage}</p>
            ) : (
                <>
                    <h1 className={"text-8xl"}>
                        {`${props.statusCode}${displayInfoCode(infoCode)}`}
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
