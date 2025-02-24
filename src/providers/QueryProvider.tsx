"use client";

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import React from "react";

export default function QueryProvider({children}: { children: React.ReactNode }) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: 1,
                refetchOnWindowFocus: false,
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}