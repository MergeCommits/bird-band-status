import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { birdStatusCodeDetails } from "birdCodes/statusCode/statusCodeDetails";
import type { BirdStatusCode } from "birdCodes/statusCode/validStatusCodes";
import { Fragment, useMemo } from "react";
import type { ReactFunction } from "types/ReactFunction";

type Props = {
    currentStatus: BirdStatusCode;
    onStatusChange: (status: BirdStatusCode) => void;
};

export const StatusCodeSelect: ReactFunction<Props> = (props) => {
    const currentStatusText = useMemo(
        () =>
            `${props.currentStatus} - ${
                birdStatusCodeDetails[props.currentStatus].description
            }`,
        [props.currentStatus]
    );

    return (
        <Listbox value={props.currentStatus} onChange={props.onStatusChange}>
            <div className={"mt-1 w-full max-w-xl"}>
                <Listbox.Button
                    className={
                        "flex w-full cursor-default justify-between rounded-lg bg-accent px-3 py-2 text-left text-secondary shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                    }
                >
                    <div className={"truncate"}>{currentStatusText}</div>
                    <div className={"pointer-events-none flex items-center"}>
                        <ChevronUpDownIcon
                            className={"h-5 w-5 text-gray-400"}
                            aria-hidden={"true"}
                        />
                    </div>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave={"transition ease-in duration-100"}
                    leaveFrom={"opacity-100"}
                    leaveTo={"opacity-0"}
                >
                    <Listbox.Options
                        className={
                            "absolute mt-1 max-h-60 w-max overflow-auto rounded-md bg-secondary py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                        }
                    >
                        {Object.entries(birdStatusCodeDetails).map(
                            ([key, value]) => (
                                <Listbox.Option
                                    key={key}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                                ? "bg-amber-100 text-amber-900"
                                                : "text-accent"
                                        }`
                                    }
                                    value={key}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${
                                                    selected
                                                        ? "font-medium"
                                                        : "font-normal"
                                                }`}
                                            >
                                                {`${key} - ${value.description}`}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={
                                                        "absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                                                    }
                                                >
                                                    <CheckIcon
                                                        className={"h-5 w-5"}
                                                        aria-hidden={"true"}
                                                    />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            )
                        )}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
};
