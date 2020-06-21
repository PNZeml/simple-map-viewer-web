import {container} from "inversify-props";
import {AuthWebApiService} from "@/data/webapi/auth/AuthWebApiService";
import AuthWebApiServiceImpl from "@/data/webapi/auth/AuthWebApiServiceImpl";
import {GeoFilesWebApiService} from "@/data/webapi/geofile/GeoFilesWebApiService";
import GeoFilesWebApiServiceImpl
    from "@/data/webapi/geofile/GeoFilesWebApiServiceImpl";
import UserWebApiService from "@/data/webapi/user/UserWebApiService";

function load(): void {
    container.addTransient<AuthWebApiService>(
        AuthWebApiServiceImpl,
        "AuthWebApiService"
    );
    container.addTransient<GeoFilesWebApiService>(
        GeoFilesWebApiServiceImpl,
        "GeoFilesWebApiService"
    );
    container.addTransient<UserWebApiService>(
        UserWebApiService,
        "UserWebApiService"
    );
}

export const WebApiModule = load();