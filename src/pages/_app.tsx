import { appWithTranslation } from "next-i18next";
import type { AppType } from "next/app";
import "styles/globals.css";
import { api } from "utils/api";

const MyApp: AppType = ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
};

export default api.withTRPC(appWithTranslation(MyApp));
