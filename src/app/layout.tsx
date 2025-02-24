import {Geist, Geist_Mono} from "next/font/google";
import "@/assets/styles/main.scss";
import QueryProvider from "@/providers/QueryProvider";
import {MetadataProvider} from "@/providers/MetaDataProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = () => MetadataProvider({})

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <QueryProvider>
            {children}
        </QueryProvider>
        </body>
        </html>
    );
}
