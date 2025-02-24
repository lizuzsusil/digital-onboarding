import CustomAxios from "@/lib/utility/customAxios";
import {AxiosRequestConfig, AxiosResponse} from "axios";

const axiosBase = CustomAxios;

interface AuthHeaders {
    Authorization?: string;
    Cookie?: string;
    "content-type"?: string;
}

interface RequestConstants {
    authHeaders: AuthHeaders;
}

const constants: RequestConstants = {authHeaders: {}};

export const setAuthHeaders = (token: string | null): void => {
    constants.authHeaders = token
        ? {Authorization: `Bearer ${token}`}
        : {};
};

interface ConfigOptions {
    config?: AxiosRequestConfig;
    token?: string | null;
    serverCookie?: string;
    multipart?: boolean;
}

const getConfig = ({
                       config = {},
                       token,
                       serverCookie,
                       multipart,
                   }: ConfigOptions): AxiosRequestConfig => {
    return {
        ...config,
        headers: {
            ...constants.authHeaders,
            ...(token ? {Authorization: `Bearer ${token}`} : {}),
            ...(serverCookie ? {Cookie: serverCookie} : {}), // Fixed Cookie format
            ...(multipart ? {"content-type": "multipart/form-data"} : {}),
        },
        withCredentials: false,
    };
};

// interface ApiResponse<T> {
//     data: T;
//     status: number;
//     statusText: string;
//     headers: Record<string, string>;
//     config: AxiosRequestConfig;
// }

const get = <T>(
    endpoint: string,
    query: Record<string, string | number | boolean> = {},
    token?: string | null,
    serverCookie?: string,
    config: AxiosRequestConfig = {}
): Promise<AxiosResponse<T>> => {
    const queryString = new URLSearchParams(
        query as Record<string, string>
    ).toString();
    return axiosBase.get<T>(
        `${endpoint}${queryString ? `?${queryString}` : ""}`,
        getConfig({token, serverCookie, config})
    );
};

const post = <T>(
    endpoint: string,
    payload?: Record<string, unknown> | FormData,
    token?: string | null,
    multipart = false
): Promise<AxiosResponse<T>> => {
    return axiosBase.post<T>(
        endpoint,
        payload,
        getConfig({token, multipart})
    );
};

const put = <T>(
    endpoint: string,
    payload: Record<string, unknown> | FormData,
    token?: string | null,
    multipart = false
): Promise<AxiosResponse<T>> => {
    return axiosBase.put<T>(
        endpoint,
        payload,
        getConfig({token, multipart})
    );
};

const patch = <T>(
    endpoint: string,
    payload: Record<string, unknown> | FormData,
    token?: string | null,
    multipart = false
): Promise<AxiosResponse<T>> => {
    return axiosBase.patch<T>(
        endpoint,
        payload,
        getConfig({token, multipart})
    );
};

const del = <T>(
    endpoint: string,
    payload?: Record<string, unknown>,
    token?: string | null
): Promise<AxiosResponse<T>> => {
    return axiosBase.delete<T>(endpoint, {
        data: payload,
        ...getConfig({token}),
    });
};

export const HttpRequest = {
    get,
    post,
    put,
    patch,
    delete: del,
};