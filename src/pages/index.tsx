import type { InfoCategory } from "birdCodes/infoCode/infoCategories";
import { getDetailsOfInfoCodeInputs } from "birdCodes/infoCode/infoCodeDisplay";
import type { InfoCodeInput } from "birdCodes/infoCode/validInfoCodes";
import type { BirdStatusCode } from "birdCodes/statusCode/validStatusCodes";
import { CategoryTabs } from "components/CategoryTabs";
import { InfoCodeCard } from "components/InfoCodeCard";
import { ResultHeader } from "components/ResultHeader";
import { StatusCodeSelect } from "components/StatusCodeSelect";
import type { NextPage } from "next";
import Head from "next/head";
import { useMemo, useState } from "react";

const Home: NextPage = () => {
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
                <title>{"Bird band status"}</title>
                <meta name={"description"} content={"What"} />
                <link rel={"icon"} href={"/public/favicon.ico"} />
            </Head>
            <div className={"min-h-screen bg-primary"}>
                <main
                    className={
                        "container mx-auto flex flex-col items-center justify-center p-4 text-contrast"
                    }
                >
                    <h1 className={"text-3xl font-extrabold leading-normal "}>
                        {"People like smokes"}
                    </h1>
                    <p className={"mb-8 pt-4 text-xl"}>
                        {"Like really big smokes"}
                    </p>
                    <ResultHeader
                        statusCode={statusCode}
                        infoCodes={inputCodes}
                    />
                    <StatusCodeSelect
                        currentStatus={statusCode}
                        onStatusChange={statusCodeHandler}
                    />
                    <CategoryTabs
                        currentTab={currentCategory}
                        onTabChange={categoryHandler}
                    />
                    <hr
                        className={
                            "mx-20 h-[1px] w-full border-t-0 bg-neutral-200 opacity-50"
                        }
                    />
                    <div
                        className={
                            "flex w-full flex-col items-center gap-4 pt-8"
                        }
                    >
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
