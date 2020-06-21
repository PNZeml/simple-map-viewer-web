import {container} from "inversify-props";
import GeoFileViewModel from "@/features/geofile/viewmodel/geofile/GeoFileViewModel";
import GeoFilesStore from "@/domain/stores/geofile/GeoFilesStore";
import GeoFileDetailsViewModel
    from "@/features/geofile/viewmodel/geofile-details/GeoFileDetailsViewModel";
import GeoFilesUploadDialogViewModel
    from "@/features/geofile/viewmodel/geofile-upload/GeoFilesUploadDialogViewModel";
import GeoFileShareViewModel
    from "@/features/geofile/viewmodel/geofile-share/GeoFileShareViewModel";
import MapViewModel from "@/features/map/viewmodel/MapViewModel";
import GeoFileSharedViewModel from "@/features/geofile-shared/viewmodels/GeoFileSharedViewModel";

function load(): void {
    // Stores
    container.addSingleton<GeoFilesStore>(
        GeoFilesStore,
        "GeoFilesStore"
    );
    // ViewModels
    container.addSingleton<GeoFileViewModel>(
        GeoFileViewModel,
        "GeoFileViewModel"
    );
    container.addSingleton<GeoFileDetailsViewModel>(
        GeoFileDetailsViewModel,
        "GeoFileDetailsViewModel"
    );
    container.addSingleton<GeoFileShareViewModel>(
        GeoFileShareViewModel,
        "GeoFileShareViewModel"
    );
    container.addSingleton<GeoFilesUploadDialogViewModel>(
        GeoFilesUploadDialogViewModel,
        "GeoFilesUploadDialogViewModel"
    );
    container.addSingleton<MapViewModel>(MapViewModel, "MapViewModel");
    container.addSingleton<GeoFileSharedViewModel>(
        GeoFileSharedViewModel,
        "GeoFileSharedViewModel"
    );
}

export const GeoFileModule = load();