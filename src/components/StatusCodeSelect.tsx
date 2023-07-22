import {
    validStatusCodes,
    type BirdStatusCode,
} from "birdCodes/statusCode/validStatusCodes";
import { useTranslation } from "next-i18next";
import { useId } from "react";
import { classNames } from "utils/tailwindUtils";

type Props = {
    currentStatus: BirdStatusCode;
    onStatusChange: (status: BirdStatusCode) => void;
};

export function StatusCodeSelect(props: Props) {
    const { t } = useTranslation("statusCode");
    const birdStatusID = useId();

    return (
        <div className={"mr-auto"}>
            <label
                htmlFor={birdStatusID}
                className={"mb-2 block text-sm font-medium"}
            >
                {t("common:selectStatusCode")}
            </label>
            <select
                id={birdStatusID}
                className={classNames(
                    "w-full rounded-lg border border-gray-600 bg-secondary p-2.5 text-sm text-contrast placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500",
                    "overflow-x-hidden" // Selected option with long text will generate invisible overflow on Safari
                )}
                value={props.currentStatus}
                onChange={(event) => {
                    props.onStatusChange(
                        Number(event.target.value) as BirdStatusCode
                    );
                }}
            >
                {validStatusCodes.map((value) => {
                    const description = t(
                        `statusCode:statusCode.${value}.description`
                    );
                    return (
                        <option key={value} value={value}>
                            {`${value} - ${description}`}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}
