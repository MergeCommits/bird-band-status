// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import i18nConfig from "./next-i18next.config.js";
const { i18n } = i18nConfig;

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
    i18n,
    reactStrictMode: true,
    swcMinify: true,
};
export default config;
