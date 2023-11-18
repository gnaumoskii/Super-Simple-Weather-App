import type { Metadata } from "next";
import { Inter, Montserrat, Open_Sans, Roboto } from "next/font/google";
import "./globals.css";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["900", "700", "500"]});

export const metadata: Metadata = {
    title: "Super Simple Weather App",
    description: "Just a super simple weather application.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="!scroll-smooth">
            <body className={montserrat.className}>
                {children}
                <div id="portal"></div>
            </body>
        </html>
    );
}
