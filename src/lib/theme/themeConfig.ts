import type {ThemeConfig} from "antd";
import {variables} from "@/lib/theme/scssVariables";

export const themePrefix = 'gibl';

const themeConfig: ThemeConfig = {
    cssVar: {
        prefix: themePrefix,
    },
    components: {
        Button: {
            borderRadius: 0,
            controlHeight: 16,
            lineHeight: variables["line-height"],
            fontSize: 16,
            colorBorder: '#234534',
            colorPrimary: '#234534',
            primaryColor: "#fff",
            colorPrimaryBorder: '#234534',
            colorPrimaryHover: '#234534',
            colorPrimaryActive: '#234534',
            primaryShadow: 'none',

            defaultBg: "#fff",
            defaultBorderColor: '#234534',
            defaultColor: '#234534',
            defaultActiveBg: '#234534',
            defaultActiveColor: "#ffffff",
            defaultHoverColor: "#ffffff",
            defaultHoverBg: '#234534',
            defaultHoverBorderColor: '#234534',
            borderColorDisabled: '#d9d9d9',

            colorLink: '#234534',
            colorLinkActive: '#234534',
            colorLinkHover: '#234534'
        },
        Input: {
            activeBorderColor: variables["activeBorderColor"],
            hoverBorderColor: variables["hoverBorderColor"],
            addonBg: variables["addonBg"],
            hoverBg: variables["hoverBg"],
            colorBorder: variables["colorBorder"],
            activeShadow: variables["activeShadow"],
        }
    }
};

export default themeConfig;
