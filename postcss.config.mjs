const config = {
    theme: {
        extend: {
            fontFamily: {
                barlow: ["var(--font-barlow)", "sans-serif"],
                barlowCondensed: ["var(--font-barlow-condensed)", "sans-serif"],
                gildaDisplay: ["var(--font-gilda-display)", "serif"],
            },
        },
    },
    plugins: ["@tailwindcss/postcss"],
};

export default config;
