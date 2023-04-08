import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>{"Which Dead by Daylight perk is this"}</title>
                <meta
                    name={"description"}
                    content={
                        "Figure out the dead by daylight perk by its icon description."
                    }
                />
                <link rel={"icon"} href={"/public/favicon.ico"} />
            </Head>
            <div className={"min-h-screen bg-stone-900"}>
                <main
                    className={
                        "container mx-auto flex flex-col items-center justify-center p-4 text-slate-400"
                    }
                >
                    <h1 className={"text-3xl font-extrabold leading-normal "}>
                        {"Which Dead by Daylight perk is this?"}
                    </h1>
                    <p className={"pt-4 text-xl"}>{"Amoamogus"}</p>
                </main>
            </div>
        </>
    );
};

export default Home;
