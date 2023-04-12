import { Tab } from "@headlessui/react";
import {
    ArchiveBoxArrowDownIcon,
    BeakerIcon,
    EllipsisHorizontalCircleIcon,
} from "@heroicons/react/20/solid";
import type { ReactFunction } from "types/ReactFunction";
import { classNames } from "utils/tailwindUtils";

type Props = {
    currentTab: string;
    onTabChange: (tab: string) => void;
};

export const CategoryTabs: ReactFunction<Props> = (props) => {
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
    ];

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
                                    "w-max border-b-2 px-5 py-2.5 text-sm font-medium leading-5 focus:outline-none",
                                    selected
                                        ? "border-b-secondary font-bold text-secondary"
                                        : "rounded-md border-b-transparent text-white hover:bg-white/[0.12]"
                                )
                            }
                        >
                            <span className={"h-6 w-6 text-blue-500"}>
                                {category.icon}
                            </span>
                            {category.name}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className={"mt-2 flex justify-center"}>
                    {allTabs.map((posts, idx) => (
                        <Tab.Panel
                            key={idx}
                            className={classNames(
                                "rounded-xl bg-accent p-3",
                                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                            )}
                        >
                            <ul>
                                {/* {posts.map((post) => ( */}
                                <li className={"rounded-md p-3"}>
                                    <h3
                                        className={
                                            "text-sm font-medium leading-5"
                                        }
                                    >
                                        {"post.title"}
                                    </h3>

                                    <ul
                                        className={
                                            "mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-800"
                                        }
                                    >
                                        <li>{"post.date"}</li>
                                        <li>&middot;</li>
                                        <li>
                                            {"post.commentCount"} {"comments"}
                                        </li>
                                        <li>&middot;</li>
                                        <li>
                                            {"post.shareCount"}
                                            {" shares"}
                                        </li>
                                    </ul>
                                </li>
                                {/* ))} */}
                            </ul>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};
