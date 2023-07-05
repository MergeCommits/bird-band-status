import { displayInfoCode } from "birdCodes/infoCode/infoCodeDisplay";
import type { InfoCodeInput } from "birdCodes/infoCode/validInfoCodes";
import { MISSING_LONG_DESCRIPTION } from "components/ResultHeader";
import { useTranslation } from "next-i18next";
import { classNames } from "utils/tailwindUtils";

type Props = {
    code: InfoCodeInput;
    enabled: boolean;
    onToggle: (code: InfoCodeInput) => void;
};

export function InfoCodeCard(props: Props) {
    const { t } = useTranslation();

    const shortDescription = t(
        `statusCode:infoCode.${props.code}.shortDescription`
    );
    const longDescription = t(
        `statusCode:infoCode.${props.code}.longDescription`,
        MISSING_LONG_DESCRIPTION
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
                {`${displayInfoCode(props.code)} - ${shortDescription}`}
            </h5>
            <p>
                {longDescription !== MISSING_LONG_DESCRIPTION
                    ? longDescription
                    : shortDescription}
            </p>
        </button>
    );
}
