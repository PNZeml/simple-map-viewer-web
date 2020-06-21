import {inject} from "inversify-props";
import {GeoFilesWebApiService} from "@/data/webapi/geofile/GeoFilesWebApiService";
import {action, observable} from "mobx";
import {GeoFile} from "@/domain/models/GeoFile";
import {LoadingState} from "@/domain/enums/LoadingState";
import LocalStorageUtils from "@/common/utils/LocalStorageUtils";

export default class GeoFileSharedViewModel {
    @inject("GeoFilesWebApiService")
    private geoFilesService!: GeoFilesWebApiService;

    @observable
    public geoFiles: Array<GeoFile> = [];

    @action
    public async loadGeoFiles(): Promise<void> {
        this.geoFiles = await this.geoFilesService.getAllGeoFiles(true);
        console.log(this.geoFiles)
    }
}