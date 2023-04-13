import {
    ArchiveBoxArrowDownIcon,
    BeakerIcon,
    CpuChipIcon,
    EllipsisHorizontalCircleIcon,
    EyeIcon,
    FingerPrintIcon,
} from "@heroicons/react/20/solid";
import { useId } from "react";
import type { ReactFunction } from "types/ReactFunction";
import { classNames } from "utils/tailwindUtils";

const allTabs = [
    {
        name: "All",
        icon: <EllipsisHorizontalCircleIcon />,
    },
    {
        name: "Sample",
        icon: <BeakerIcon />,
    },
    {
        name: "Capture Method",
        icon: <ArchiveBoxArrowDownIcon />,
    },
    {
        name: "Visual Aux Marker",
        icon: <EyeIcon />,
    },
    {
        name: "Electronic Aux Marker",
        icon: <CpuChipIcon />,
    },
    {
        name: "Other",
        icon: <FingerPrintIcon />,
    },
];

type Props = {
    currentTab: string;
    onTabChange: (tab: string) => void;
};

export const CategoryTabs: ReactFunction<Props> = (props) => {
    const tabGroupID = useId();

    return (
        <div
            className={
                "mb-6 mt-8 flex w-full justify-between px-2 py-1 sm:px-0"
            }
            id={tabGroupID}
        >
            {allTabs.map((category) => (
                <button
                    key={category.name}
                    role={"tab"}
                    aria-selected={props.currentTab === category.name}
                    aria-controls={tabGroupID}
                    onClick={() => props.onTabChange(category.name)}
                    className={classNames(
                        "flex w-max items-center gap-2 border-b-2 px-5 py-2.5 text-sm font-medium leading-5 focus:outline-none",
                        props.currentTab === category.name
                            ? "border-b-accent font-bold text-accent"
                            : "rounded-md border-b-transparent hover:bg-white/[0.12]"
                    )}
                >
                    <div className={"mx-auto h-5 w-5 shrink-0 basis-5"}>
                        {category.icon}
                    </div>
                    {category.name}
                </button>
            ))}
        </div>
    );
};
