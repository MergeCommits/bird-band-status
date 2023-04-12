import type { Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#19376D",
                secondary: "#A5D7E8",
                accent: "#576CBC",
            },
        },
    },
    plugins: [],
} satisfies Config;
