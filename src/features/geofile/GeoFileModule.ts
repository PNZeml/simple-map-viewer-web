import {container} from "inversify-props";
import GeoFileViewModel from "@/features/geofile/viewmodel/geofile/GeoFileViewModel";
import GeoFilesStore from "@/features/geofile/stores/GeoFilesStore";
import GeoFileDetailsViewModel
    from "@/features/geofile/viewmodel/geofile-details/GeoFileDetailsViewModel";
import GeoFilesUploadDialogViewModel
    from "@/features/geofile/viewmodel/geofile-upload/GeoFilesUploadDialogViewModel";
import GeoFileShareDialogViewModel
    from "@/features/geofile/viewmodel/geofile-share/GeoFileShareDialogViewModel";

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
    container.addSingleton<GeoFileShareDialogViewModel>(
        GeoFileShareDialogViewModel,
        "GeoFileShareDialogViewModel"
    );
    container.addSingleton<GeoFilesUploadDialogViewModel>(
        GeoFilesUploadDialogViewModel,
        "GeoFilesUploadDialogViewModel"
    );
}

export const GeoFileModule = load();