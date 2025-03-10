import React from "react";
import {ConfigProvider} from "antd";
import {Geist, Geist_Mono} from "next/font/google";
import '@ant-design/v5-patch-for-react-19';

import QueryProvider from "@/providers/QueryProvider";
import {MetadataProvider} from "@/providers/MetaDataProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import themeConfig, {themePrefix} from "@/lib/theme/themeConfig";
import "@/assets/styles/main.scss";
import {MessageContextProvider} from "@/contexts/MessageContext";


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
        <ConfigProvider theme={themeConfig} prefixCls={themePrefix}>
            <MessageContextProvider>
                <QueryProvider>
                    <Header/>
                    {children}
                    <Footer/>
                </QueryProvider>
            </MessageContextProvider>
        </ConfigProvider>
        </body>
        </html>
    );
}
