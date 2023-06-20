import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import {
    displayInfoCode,
    getOutputCodeDetails,
} from "birdCodes/infoCode/infoCodeDisplay";
import { getInfoCode } from "birdCodes/infoCode/infoCodeLogic";
import type { InfoCodeInput } from "birdCodes/infoCode/validInfoCodes";
import type { BirdStatusCode } from "birdCodes/statusCode/validStatusCodes";
import { useMemo, useState } from "react";

function useInfoCodeDetails(
    statusCode: BirdStatusCode,
    inputCodes: InfoCodeInput[]
): [ReturnType<typeof getOutputCodeDetails> | null, string] {
    return useMemo(() => {
        try {
            const infoCode = getInfoCode(statusCode, inputCodes);
            return [getOutputCodeDetails(infoCode), ""];
        } catch (e) {
            if (e instanceof Error) {
                return [null, e.message];
            } else {
                return [null, "Something went wrong"];
            }
        }
    }, [statusCode, inputCodes]);
}

type Props = {
    statusCode: BirdStatusCode;
    infoCodes: InfoCodeInput[];
};

export function ResultHeader(props: Props) {
    const [expandDescription, setExpandDescription] = useState(false);

    const [infoCodeDetails, errorMessage] = useInfoCodeDetails(
        props.statusCode,
        props.infoCodes
    );

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
                        onClick={() => setExpandDescription((prev) => !prev)}
                    >
                        <div className={"flex justify-center"}>
                            {expandDescription ? (
                                <>
                                    {"Hide Description"}
                                    <ChevronUpIcon className={"h-5 w-5"} />
                                </>
                            ) : (
                                <>
                                    {"Show Description"}
                                    <ChevronDownIcon className={"h-5 w-5"} />
                                </>
                            )}
                        </div>
                    </button>
                    {expandDescription && (
                        <p>
                            <span className={"font-bold"}>
                                {infoCodeDetails.shortDescription}
                            </span>
                            {infoCodeDetails.longDescription && (
                                <>
                                    <br />
                                    {infoCodeDetails.longDescription}
                                </>
                            )}
                        </p>
                    )}
                </>
            )}
        </div>
    );
}
