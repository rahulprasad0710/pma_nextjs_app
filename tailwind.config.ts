import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                barlow: ["var(--font-barlow)", "sans-serif"],
                barlowCondensed: ["var(--font-barlow-condensed)", "sans-serif"],
                gildaDisplay: ["var(--font-gilda-display)", "serif"],
            },
        },
    },
    plugins: [],
};
export default config;
