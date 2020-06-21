import {computed, observable} from "mobx";
import DateUtils from "@/common/utils/DateUtils";
import StringUtils from "@/common/utils/StringUtils";
import GeoFilesStore from "@/domain/stores/geofile/GeoFilesStore";
import {inject} from "inversify-props";
import {GeoFile} from "@/domain/models/GeoFile";
import GeoFileActivityRecord from "@/domain/models/GeoFileActivityRecord";

export default class GeoFileDetailsViewModel {
    @inject("GeoFilesStore")
    private store!: GeoFilesStore;

    @observable
    public geoFile: GeoFile | null = null;

    @computed
    public get geoFileActivityRecords(): Array<GeoFileActivityRecord> | undefined {
        return this.geoFile?.geoFileActivityRecords;
    }

    @computed
    public get name(): string {
        if (!this.geoFile) throw new Error("Argument is null");

        return this.geoFile.name.toUpperCase();
    }

    @computed
    public get size(): string {
        if (!this.geoFile) throw new Error("Argument is null");
        const bytes = this.geoFile?.size;
        return StringUtils.toSize(bytes);
    }

    @computed
    public get created(): string {
        return DateUtils.toTimeFormatIfTodayOtherwiseDate(this.geoFile?.created!);
    }

    @computed
    public get owner(): string {
        return this.geoFile?.owner!;
    }

    @computed
    public get modified(): string | null {
        if (!this.geoFile?.modified) return null;
        return DateUtils.toTimeFormatIfTodayOtherwiseDate(this.geoFile?.modified!);
    }

    @computed
    public get opened(): string | null {
        if (!this.geoFile?.opened) return null;
        return DateUtils.toTimeFormatIfTodayOtherwiseDate(this.geoFile?.opened!);
    }
}
