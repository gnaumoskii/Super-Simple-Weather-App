import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Super Simple Weather App",
    description: "Just a super simple weather application.",
    icons: {
        icon: "weather-app-icon-3.png"
    }
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
