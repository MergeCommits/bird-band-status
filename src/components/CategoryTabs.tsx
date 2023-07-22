import {
    ArchiveBoxArrowDownIcon,
    BeakerIcon,
    CpuChipIcon,
    EllipsisHorizontalCircleIcon,
    EyeIcon,
    FingerPrintIcon,
} from "@heroicons/react/20/solid";
import { useTranslation } from "next-i18next";
import { useId } from "react";
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

export function CategoryTabs(props: Props) {
    const { t } = useTranslation();
    const tabGroupID = useId();

    return (
        <div
            className={
                "mb-4 mt-8 flex w-full justify-between overflow-x-auto px-2 py-1 sm:px-0"
            }
            id={tabGroupID}
        >
            {allTabs.map((category) => (
                <button
                    key={category.name}
                    role={"tab"}
                    aria-selected={props.currentTab === category.name}
                    aria-controls={tabGroupID}
                    onClick={() => {
                        props.onTabChange(category.name);
                    }}
                    className={classNames(
                        "flex items-center gap-2 border-b-2 px-5 py-2.5 text-sm font-medium leading-5 focus:outline-none",
                        props.currentTab === category.name
                            ? "border-b-accent font-bold text-accent"
                            : "rounded-md border-b-transparent hover:bg-white/[0.12]"
                    )}
                >
                    <div className={"mx-auto h-5 w-5 shrink-0 basis-5"}>
                        {category.icon}
                    </div>
                    {t(`category.${category.name}`)
                        .split(" ")
                        .map(
                            (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                </button>
            ))}
        </div>
    );
}
