import type { Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#19376D",
                secondary: "#794685",
                accent: "#A5D7E8",
            },
        },
    },
    plugins: [],
} satisfies Config;
