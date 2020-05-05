import {container} from "inversify-props";
import {GeoFilesWebApiService} from "@/features/geofiles/services/GeoFilesWebApiService";
import GeoFilesWebApiServiceImpl from "@/features/geofiles/services/GeoFilesWebApiServiceImpl";
import GeoFilesViewModelImpl from "@/features/geofiles/viewmodel/GeoFilesViewModelImpl";
import {GeoFilesViewModel} from "@/features/geofiles/viewmodel/GeoFilesViewModel";

function load(): void {
    container.addSingleton<GeoFilesViewModel>(GeoFilesViewModelImpl, "GeoFilesViewModel");
    container.addTransient<GeoFilesWebApiService>(
        GeoFilesWebApiServiceImpl,
        "GeoFilesWebApiService"
    );
}

export const GeoFilesModuleLoad = load();