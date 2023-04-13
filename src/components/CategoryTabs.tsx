import { Tab } from "@headlessui/react";
import {
    ArchiveBoxArrowDownIcon,
    BeakerIcon,
    CpuChipIcon,
    EllipsisHorizontalCircleIcon,
    EyeIcon,
    FingerPrintIcon,
} from "@heroicons/react/20/solid";
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
    return (
        <div className={"w-full max-w-5xl px-2 py-16 sm:px-0"}>
            <Tab.Group
                selectedIndex={allTabs.findIndex(
                    (tab) => tab.name === props.currentTab
                )}
                onChange={(index) => {
                    props.onTabChange(allTabs[index].name);
                }}
            >
                <Tab.List
                    className={"flex justify-center space-x-1 rounded-xl p-1"}
                >
                    {allTabs.map((category) => (
                        <Tab
                            key={category.name}
                            className={({ selected }) =>
                                classNames(
                                    "flex w-max gap-2 border-b-2 px-5 py-2.5 text-sm font-medium leading-5 focus:outline-none",
                                    selected
                                        ? "border-b-accent font-bold text-accent"
                                        : "rounded-md border-b-transparent hover:bg-white/[0.12]"
                                )
                            }
                        >
                            <span className={"mx-auto block h-5 w-5"}>
                                {category.icon}
                            </span>
                            {category.name}
                        </Tab>
                    ))}
                </Tab.List>
            </Tab.Group>
        </div>
    );
};
