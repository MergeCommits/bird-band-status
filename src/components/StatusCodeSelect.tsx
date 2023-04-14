import { birdStatusCodeDetails } from "birdCodes/statusCode/statusCodeDetails";
import type { BirdStatusCode } from "birdCodes/statusCode/validStatusCodes";
import { useId } from "react";
import type { ReactFunction } from "types/ReactFunction";

type Props = {
    currentStatus: BirdStatusCode;
    onStatusChange: (status: BirdStatusCode) => void;
};

export const StatusCodeSelect: ReactFunction<Props> = (props) => {
    const birdStatusID = useId();

    return (
        <div className={"mr-auto"}>
            <label
                htmlFor={birdStatusID}
                className={"mb-2 block text-sm font-medium"}
            >
                {"Select a status code:"}
            </label>
            <select
                id={birdStatusID}
                className={
                    "w-full overflow-x-hidden rounded-lg border border-gray-600 bg-secondary p-2.5 text-sm text-contrast placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                }
                value={props.currentStatus}
                onChange={(event) =>
                    props.onStatusChange(
                        Number(event.target.value) as BirdStatusCode
                    )
                }
            >
                {Object.entries(birdStatusCodeDetails).map(([key, value]) => (
                    <option key={key} value={key}>
                        {`${key} - ${value.description}`}
                    </option>
                ))}
            </select>
        </div>
    );
};
