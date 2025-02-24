import '@ant-design/v5-patch-for-react-19';
import Index from "./index"
import {ConfigProvider} from "antd";
import React from "react";
import themeConfig, {themePrefix} from "@/lib/theme/themeConfig";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <ConfigProvider theme={themeConfig} prefixCls={themePrefix}>
            <Header/>
            <Index/>
            <Footer/>
        </ConfigProvider>
    );
}
