import {container} from "inversify-props";
import {AuthWebApiService} from "@/data/webapi/services/auth/AuthWebApiService";
import AuthWebApiServiceImpl from "@/data/webapi/services/auth/AuthWebApiServiceImpl";
import {GeoFilesWebApiService} from "@/data/webapi/services/geofile/GeoFilesWebApiService";
import GeoFilesWebApiServiceImpl
    from "@/data/webapi/services/geofile/GeoFilesWebApiServiceImpl";
import UserWebApiService from "@/data/webapi/services/user/UserWebApiService";

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