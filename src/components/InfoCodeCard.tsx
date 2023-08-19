import { displayInfoCode } from "birdCodes/infoCode/infoCodeDisplay";
import type { InfoCodeInput } from "birdCodes/infoCode/validInfoCodes";
import { MISSING_LONG_DESCRIPTION } from "components/ResultHeader";
import { useTranslation } from "next-i18next";

type Props = {
    code: InfoCodeInput;
    enabled: boolean;
    onToggle: (code: InfoCodeInput) => void;
};

export function InfoCodeCard(props: Props) {
    const { t } = useTranslation("statusCode");

    const shortDescription = t(`infoCode.${props.code}.shortDescription`);
    const longDescription: string = t(
        `infoCode.${props.code}.longDescription`,
        MISSING_LONG_DESCRIPTION
    );

    return (
        <button
            role={"checkbox"}
            className={
                "w-full max-w-4xl rounded-md bg-secondary p-6 transition duration-200 ease-in-out hover:bg-secondary-light aria-checked:ring-2 aria-checked:ring-accent"
            }
            aria-checked={props.enabled}
            onClick={() => {
                props.onToggle(props.code);
            }}
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
