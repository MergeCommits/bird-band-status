import {
    displayInfoCode,
    getOutputCodeDetails,
} from "birdCodes/infoCode/infoCodeDisplay";
import { getInfoCode } from "birdCodes/infoCode/infoCodeLogic";
import type { InfoCodeInput } from "birdCodes/infoCode/validInfoCodes";
import type { BirdStatusCode } from "birdCodes/statusCode/validStatusCodes";
import { useMemo } from "react";
import type { ReactFunction } from "types/ReactFunction";

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

export const ResultHeader: ReactFunction<Props> = (props) => {
    const [infoCodeDetails, errorMessage] = useInfoCodeDetails(
        props.statusCode,
        props.infoCodes
    );

    return infoCodeDetails === null ? (
        <p className={"text-red-800"}>{errorMessage}</p>
    ) : (
        <div
            className={
                "mb-8 flex min-h-[225px] w-full max-w-4xl flex-col items-center rounded-lg bg-secondary p-4"
            }
        >
            <h1 className={"text-8xl"}>
                {`${props.statusCode}${displayInfoCode(infoCodeDetails.code)}`}
            </h1>
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
        </div>
    );
};
