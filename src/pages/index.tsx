import type { InfoCategory } from "birdCodes/infoCode/infoCategories";
import type { InfoCodeInput } from "birdCodes/infoCode/validInfoCodes";
import type { BirdStatusCode } from "birdCodes/statusCode/validStatusCodes";
import { CategoryTabs } from "components/CategoryTabs";
import { StatusCodeSelect } from "components/StatusCodeSelect";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const Home: NextPage = () => {
    const [statusCode, setStatusCode] = useState<BirdStatusCode>(2);
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
                        "container mx-auto flex flex-col items-center justify-center p-4 text-gray-300"
                    }
                >
                    <h1 className={"text-3xl font-extrabold leading-normal "}>
                        {"People like smokes"}
                        {statusCode}
                        {currentCategory}
                    </h1>
                    <p className={"pt-4 text-xl"}>{"Like really big smokes"}</p>
                    <StatusCodeSelect
                        currentStatus={statusCode}
                        onStatusChange={statusCodeHandler}
                    />
                    <CategoryTabs
                        currentTab={currentCategory}
                        onTabChange={categoryHandler}
                    />
                </main>
            </div>
        </>
    );
};

export default Home;
