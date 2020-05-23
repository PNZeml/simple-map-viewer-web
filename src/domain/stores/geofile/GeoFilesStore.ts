import {action, observable} from "mobx";
import LocalStorageUtils from "@/common/utils/LocalStorageUtils";
import {inject} from "inversify-props";
import {GeoFilesWebApiService} from "@/data/webapi/services/geofile/GeoFilesWebApiService";
import {LoadingState} from "@/domain/enums/LoadingState";
import {GeoFile} from "@/domain/models/GeoFile";

export default class GeoFilesStore {
    @inject("GeoFilesWebApiService")
    private geoFilesService!: GeoFilesWebApiService;

    @observable
    public geoFiles: Array<GeoFile> = [];
    @observable
    public geoFilesLoadingState: LoadingState = LoadingState.Pending;

    @action
    public async loadGeoFiles(): Promise<void> {
        const userId = LocalStorageUtils.GetUser()?.id;
        if (userId == null) throw new Error("Argument is null");

        try {
            this.geoFilesLoadingState = LoadingState.Loading;
            this.geoFiles = await this.geoFilesService.getAll(userId);
            this.geoFilesLoadingState = LoadingState.Success;
        } catch (error) {
            this.geoFilesLoadingState = LoadingState.Error;
        }
    }
}
