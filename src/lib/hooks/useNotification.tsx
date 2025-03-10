import { message } from 'antd'
import { ArgsProps } from 'antd/es/message'
import {ConfigOptions} from "antd/es/message/interface";

const defaultConfig: ConfigOptions = {
    duration: 10,
    top: 0,
    maxCount: 2
}

export default function useNotification(customConfig?: ArgsProps) {
    const config = { ...defaultConfig, ...customConfig }

    const showSuccess = (data: string | ArgsProps) => {
        if (typeof data === 'string') {
            message.success({ ...config, content: data })
        } else {
            message.success({ ...config, ...data })
        }
    }

    const showError = (data: string | ArgsProps) => {
        if (typeof data === 'string') {
            message.error({ ...config, content: data })
        } else {
            message.error({ ...config, ...data })
        }
    }

    const showWarning = (data: string | ArgsProps) => {
        if (typeof data === 'string') {
            message.warning({ ...config, content: data })
        } else {
            message.warning({ ...config, ...data })
        }
    }

    const showInfo = (data: string | ArgsProps) => {
        if (typeof data === 'string') {
            message.info({ ...config, content: data })
        } else {
            message.info({ ...config, ...data })
        }
    }

    const removeAll = () => {
        message.destroy()
    }

    return {
        showSuccess,
        showError,
        showWarning,
        showInfo,
        removeAll
    }
}