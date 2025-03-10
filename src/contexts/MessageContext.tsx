'use client';

import React, {createContext, ReactNode} from 'react';
import {notification} from 'antd';
import {ArgsProps} from "antd/es/notification";

type NotificationType = 'success' | 'info' | 'warning' | 'error';

type ContentType = (content: string) => void;

export interface MessageContextValue {
    dispatchSuccess: ContentType;
    dispatchInfo: ContentType;
    dispatchWarning: ContentType;
    dispatchError: ContentType;
}

export interface MessageContextInterface {
    children: ReactNode;
}

export const MessageContext = createContext<MessageContextValue | undefined>(undefined);

export const MessageContextProvider = ({children}: MessageContextInterface) => {
    const [api, contextHolder] = notification.useNotification();

    const defaultConfig: Omit<ArgsProps, 'message'> = {
        duration: 4,
        placement: "bottomRight",
        showProgress: true,
    };

    const dispatchMessage = (type: NotificationType, content: string) => {
        api[type]({
            ...defaultConfig,
            message: content,
        });
    };

    const contextValue: MessageContextValue = {
        dispatchSuccess: (content) => dispatchMessage('success', content),
        dispatchInfo: (content) => dispatchMessage('info', content),
        dispatchWarning: (content) => dispatchMessage('warning', content),
        dispatchError: (content) => dispatchMessage('error', content),
    };

    return (
        <MessageContext.Provider value={contextValue}>
            {contextHolder}
            {children}
        </MessageContext.Provider>
    );
};