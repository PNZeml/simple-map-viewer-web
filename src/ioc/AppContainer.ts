import {AuthModuleLoad} from "@/features/auth/ioc/AuthModule";
import {GeoFilesModuleLoad} from "@/features/geofiles/ioc/GeoFilesModule";

function load(): void {
    AuthModuleLoad;
    GeoFilesModuleLoad;
}

export const AppContainerLoad = load();