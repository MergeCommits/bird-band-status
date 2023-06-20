import { infoCodeInputDetails } from "birdCodes/infoCode/infoCodeDetails";
import { displayInfoCode } from "birdCodes/infoCode/infoCodeDisplay";
import type { InfoCodeInput } from "birdCodes/infoCode/validInfoCodes";
import { useMemo } from "react";
import { classNames } from "utils/tailwindUtils";

type Props = {
    code: InfoCodeInput;
    enabled: boolean;
    onToggle: (code: InfoCodeInput) => void;
};

export function InfoCodeCard(props: Props) {
    const details = useMemo(
        () => infoCodeInputDetails[props.code],
        [props.code]
    );

    return (
        <button
            className={classNames(
                "w-full max-w-4xl rounded-md border-2 bg-secondary p-6 hover:bg-secondary-light",
                "transition duration-200 ease-in-out",
                props.enabled ? "border-accent" : "border-transparent"
            )}
            onClick={() => props.onToggle(props.code)}
        >
            <h5
                className={
                    "mb-2 text-2xl font-bold tracking-tight text-contrast"
                }
            >
                {`${displayInfoCode(props.code)} - ${details.shortDescription}`}
            </h5>
            <p>{details.longDescription ?? details.shortDescription + "."}</p>
        </button>
    );
}
