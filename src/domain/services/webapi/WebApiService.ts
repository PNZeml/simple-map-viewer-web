import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {webApiConfig} from "@/domain/services/webapi/WebApiConfig";

export default class WebApiService {
    private session: AxiosInstance;

    constructor() {
        this.session = axios.create(webApiConfig);

        // this middleware is been called right before the http request is made.
        this.session.interceptors.request.use((param: AxiosRequestConfig) => ({
            ...param
        }));

        // this middleware is been called right before the response is get it
        // by the method that triggers the request
        this.session.interceptors.response.use((param: AxiosResponse) => ({
            ...param
        }));
    }

    public retrieve<T, R = AxiosResponse<T>>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.session.get(url, config);
    }

    public create<T, R = AxiosResponse<T>>(
        url: string,
        data?: object,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.session.post(url, data, config);
    }

    public update<T, R = AxiosResponse<T>>(
        url: string,
        data?: object,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.session.put(url, data, config);
    }

    public remove<T, R = AxiosResponse<T>>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.session.delete(url, config);
    }
}
