import {action, computed, observable} from "mobx";
import {inject} from "inversify-props";
import {GeoFilesWebApiService} from "@/features/geofiles/services/GeoFilesWebApiService";
import {GeoFilesViewModel} from "@/features/geofiles/viewmodel/GeoFilesViewModel";
import DateUtils from "@/common/utils/DateUtils";
import LocalStorageUtils from "@/common/utils/LocalStorageUtils";

export default class GeoFilesViewModelImpl implements GeoFilesViewModel {
    @inject("GeoFilesWebApiService")
    private geoFilesService!: GeoFilesWebApiService;

    @observable
    public geoFiles: Array<GeoFile> = [];
    @observable
    public geoFile: GeoFile | null = null;

    @computed
    public get createdDate(): string | null {
        if (!this.geoFiles) return null;
        return DateUtils.toTimeFormatIfTodayOtherwiseDate(this.geoFile?.createdDate!);
    }

    @computed
    public get modifiedDate(): string | null {
        if (!this.geoFiles) return null;
        return DateUtils.toTimeFormatIfTodayOtherwiseDate(this.geoFile?.modifiedDate!);
    }

    @action
    public async fetchGeoFiles(): Promise<void> {
        const userId = LocalStorageUtils.getUser()?.id;
        if (userId == null) return;
        this.geoFiles = await this.geoFilesService.getGeoFiles(userId);
    }

    @action
    public selectGeoFile(geoFile: GeoFile | null) {
        this.geoFile = geoFile;
    }
}