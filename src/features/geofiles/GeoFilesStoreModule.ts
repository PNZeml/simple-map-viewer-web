import store from "@/common/pugins/store";
import AuthStoreModule from "@/features/auth/AuthStoreModule";
import GeoFilesWebApiServiceImpl from "@/features/geofiles/services/GeoFilesWebApiServiceImpl";
import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {webApiConfig} from "@/domain/services/webapi/WebApiConfig";

@Module({
    namespaced: true,
    name: "geofiles",
    store,
    dynamic: true,
})
class GeoFilesStoreModule extends VuexModule {
    public geoFiles: Array<GeoFile> = [];
    public selectedGeoFile: GeoFile | null = null;
    public selectedGeoFileDetails: GeoFileDetails | null = null;

    private geoFilesService: GeoFilesWebApiServiceImpl = new GeoFilesWebApiServiceImpl();

    // Mutations
    @Mutation
    private RetrieveGeoFilesSuccess(geoFiles: Array<GeoFile>): void {
        this.geoFiles = geoFiles;
    }

    @Mutation
    public setSelectedGeoFile(selectedGeoFile: GeoFile) {
        this.selectedGeoFile = selectedGeoFile;
    }

    @Mutation
    public clearSelectedGeoFile(): void {
        this.selectedGeoFile = null;
    }

    // Actions
    @Action
    public async RetrieveGeoFiles(): Promise<void> {
        const userId = AuthStoreModule.user?.id!;
        const geoFiles = await this.geoFilesService.getGeoFiles(userId);
        this.context.commit("RetrieveGeoFilesSuccess", geoFiles);
    }
}

export default getModule(GeoFilesStoreModule);