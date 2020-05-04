import {AxiosRequestConfig} from "axios";
import qs from "qs";
import LocalStorageUtils from "@/common/utils/LocalStorageUtils";

function getTokenFromLocalStorage(): string {
    const token = LocalStorageUtils.getUser()?.accessToken ?? "";
    return token ? `Token ${token}` : token;
}

export const webApiConfig: AxiosRequestConfig = {
    baseURL: process.env.VUE_APP_WEB_API_URL,
    headers: {
        Authorization: getTokenFromLocalStorage(),
    },
    paramsSerializer: (params: object) =>
        qs.stringify(params, {
            arrayFormat: "repeat"
        })
};
