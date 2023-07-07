import type { InfoCategory } from "birdCodes/infoCode/infoCategories";
import { getDetailsOfInfoCodeInputs } from "birdCodes/infoCode/infoCodeDisplay";
import type { InfoCodeInput } from "birdCodes/infoCode/validInfoCodes";
import type { BirdStatusCode } from "birdCodes/statusCode/validStatusCodes";
import { CategoryTabs } from "components/CategoryTabs";
import { InfoCodeCard } from "components/InfoCodeCard";
import { ResultHeader } from "components/ResultHeader";
import { StatusCodeSelect } from "components/StatusCodeSelect";
import type { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { classNames } from "utils/tailwindUtils";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, [
                "common",
                "statusCode",
            ])),
        },
    };
};

const Home: NextPage = () => {
    const router = useRouter();
    const { t } = useTranslation();

    const [statusCode, setStatusCode] = useState<BirdStatusCode>(3);
    const statusCodeHandler = (code: BirdStatusCode) => {
        setStatusCode(code);
    };

    const [currentCategory, setCurrentCategory] = useState<
        InfoCategory | "All"
    >("All");
    const categoryHandler = (cat: string) => {
        setCurrentCategory(cat as InfoCategory | "All");
    };

    const [inputCodes, setInputCode] = useState<InfoCodeInput[]>([]);
    const inputCodeToggleHandler = (code: InfoCodeInput) => {
        setInputCode((prev) =>
            prev.includes(code)
                ? prev.filter((c) => c !== code)
                : [...prev, code]
        );
    };

    const visibleInputs = useMemo(() => {
        if (currentCategory === "All") {
            return getDetailsOfInfoCodeInputs();
        } else {
            return getDetailsOfInfoCodeInputs().filter(
                (c) => c.category === currentCategory
            );
        }
    }, [currentCategory]);

    return (
        <>
            <Head>
                <title>{t("meta.title")}</title>
                <meta name={"description"} content={t("meta.description")} />
                <meta
                    name={"viewport"}
                    content={"width=device-width, initial-scale=1"}
                />
                <meta name={"theme-color"} content={"#000000"} />
                <meta
                    name={"keywords"}
                    content={"birds, bird banding, bird watching"}
                />

                <link rel={"icon"} href={"/public/favicon.ico"} />
            </Head>
            <div className={"min-h-screen bg-primary"}>
                <main
                    className={
                        "container mx-auto flex flex-col items-center justify-center p-4 text-contrast"
                    }
                >
                    <h1 className={"text-3xl font-extrabold leading-normal "}>
                        {t("header")}
                    </h1>
                    <div className={"mb-4 flex flex-col gap-2 text-center"}>
                        <p className={"pt-4 text-sm"}>
                            {t("headerSubtitle")}
                            <a
                                className={
                                    "break-all text-blue-500 hover:text-blue-700"
                                }
                                href={
                                    "https://www.pwrc.usgs.gov/BBL/Bander_Portal/login/birdstatus.php"
                                }
                                target={"_blank"}
                                rel={"noreferrer"}
                            >
                                {
                                    "https://www.pwrc.usgs.gov/BBL/Bander_Portal/login/birdstatus.php"
                                }
                            </a>
                        </p>
                        <p className={"text-sm"}>{t("headerNotice")}</p>
                        <p className={"text-sm"}>
                            {t("sourceCode")}
                            <a
                                className={"text-blue-500 hover:text-blue-700"}
                                href={
                                    "https://github.com/MergeCommits/bird-band-status"
                                }
                                target={"_blank"}
                                rel={"noreferrer"}
                            >
                                {"GitHub"}
                            </a>
                        </p>
                    </div>
                    <ResultHeader
                        statusCode={statusCode}
                        infoCodes={inputCodes}
                    />
                    <div className={"flex flex-col gap-4"}>
                        <StatusCodeSelect
                            currentStatus={statusCode}
                            onStatusChange={statusCodeHandler}
                        />
                        <button
                            className={classNames(
                                "rounded bg-red-500/[.3] px-4 py-2 font-bold text-white enabled:hover:bg-red-500/[.5] disabled:opacity-20",
                                "transition duration-200 ease-in-out"
                            )}
                            disabled={inputCodes.length === 0}
                            onClick={() => setInputCode([])}
                        >
                            {t("clearSelections")}
                        </button>
                    </div>
                    <CategoryTabs
                        currentTab={currentCategory}
                        onTabChange={categoryHandler}
                    />
                    <hr
                        className={
                            "mx-20 h-[1px] w-full border-t-0 bg-neutral-200 opacity-50"
                        }
                    />
                    <div className={"flex flex-col items-center gap-4 pt-8"}>
                        {visibleInputs.map((c) => (
                            <InfoCodeCard
                                key={c.code}
                                code={c.code}
                                enabled={inputCodes.includes(c.code)}
                                onToggle={inputCodeToggleHandler}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
};

export default Home;
