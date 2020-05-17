import {action, computed} from "mobx";
import {inject} from "inversify-props";
import GeoFilesStore from "@/features/geofile/stores/GeoFilesStore";
import {LoadingState} from "@/domain/enums/LoadingState";

export default class GeoFileViewModel {
    @inject("GeoFilesStore")
    private store!: GeoFilesStore;

    @computed
    public get geoFiles(): Array<GeoFile> {
        return this.store.geoFiles;
    }

    @computed
    public get areGeoFilesLoading(): boolean {
        return this.store.geoFilesLoadingState === LoadingState.Loading;
    }

    @action
    public async loadGeoFiles(): Promise<void> {
        await this.store.loadGeoFiles();
    }
}