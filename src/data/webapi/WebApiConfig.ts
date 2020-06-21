import {AxiosRequestConfig} from "axios";
import qs from "qs";
import LocalStorageUtils from "@/common/utils/LocalStorageUtils";

export const webApiConfig: AxiosRequestConfig = {
    baseURL: process.env.VUE_APP_WEB_API_URL,
    headers: {
        Authorization: `Token ${LocalStorageUtils.getToken()}`,
    },
    paramsSerializer: (params: object) =>
        qs.stringify(params, {
            arrayFormat: "repeat"
        })
};
