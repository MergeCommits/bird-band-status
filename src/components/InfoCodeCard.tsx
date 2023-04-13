import { infoCodeInputDetails } from "birdCodes/infoCode/infoCodeDetails";
import type { InfoCodeInput } from "birdCodes/infoCode/validInfoCodes";
import { useMemo } from "react";
import type { ReactFunction } from "types/ReactFunction";

type Props = {
    code: InfoCodeInput;
    onToggle: (code: InfoCodeInput) => void;
};

export const InfoCodeCard: ReactFunction<Props> = (props) => {
    const details = useMemo(
        () => infoCodeInputDetails[props.code],
        [props.code]
    );

    return (
        <div
            className={
                "flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-lg bg-secondary shadow-md hover:bg-accent hover:shadow-lg"
            }
            onClick={() => props.onToggle(props.code)}
        >
            <div className={"flex flex-col items-center justify-center"}>
                <div className={"text-2xl text-accent"}>
                    {details.shortDescription}
                </div>
                <div className={"text-sm text-accent"}>
                    {details.longDescription}
                </div>
            </div>
        </div>
    );
};
