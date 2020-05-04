import {container} from "inversify-props";
import {GeoFilesWebApiService} from "@/features/geofiles/services/GeoFilesWebApiService";
import GeoFilesWebApiServiceImpl from "@/features/geofiles/services/GeoFilesWebApiServiceImpl";

function load(): void {
    container.addTransient<GeoFilesWebApiService>(
        GeoFilesWebApiServiceImpl,
        "GeoFilesWebApiService"
    );
}

export const GeoFilesModuleLoad = load();