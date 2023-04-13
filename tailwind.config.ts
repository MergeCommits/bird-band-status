import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#10172A",
                secondary: {
                    DEFAULT: "#1E293B",
                    light: "#2F405D",
                },
                accent: "#9A208C",
                contrast: colors.gray[300],
            },
        },
    },
    plugins: [],
} satisfies Config;
