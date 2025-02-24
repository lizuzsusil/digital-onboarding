import axios from 'axios'
import {log} from '@/lib/utility/functions'

const CustomAxios = axios.create()

CustomAxios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        log(error)
        const message = error.response?.data?.message ?? error.message
        return Promise.reject({
            type: 'axios',
            payload: error.response?.data,
            status: error.response?.status,
            url: error.config?.url,
            message
        })
    }
)

CustomAxios.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        log(error)
        return Promise.reject({
            type: 'axios-request',
            message: error.message
        })
    }
)

export default CustomAxios
