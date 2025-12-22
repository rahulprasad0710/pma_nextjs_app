// app/layout.tsx
import "./globals.css";

import { Gilda_Display, Instrument_Serif, Inter } from "next/font/google";

const instrumentSerif = Instrument_Serif({
    weight: ["400"],
    subsets: ["latin", "latin-ext"],
    variable: "--font-instrument-serif",
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "600"],
    variable: "--font-inter", // add CSS variable
});

export const metadata = {
    title: "Velora Escape",
    description: "Your Luxury hotel for vacation",
};

const gildaDisplay = Gilda_Display({
    weight: ["400"],
    subsets: ["latin"],
    variable: "--font-gilda-display",
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang='en'
            className={`${inter.variable} ${instrumentSerif.variable} ${gildaDisplay.variable}`}
        >
            <body className='font-barlow'>{children}</body>
        </html>
    );
}
