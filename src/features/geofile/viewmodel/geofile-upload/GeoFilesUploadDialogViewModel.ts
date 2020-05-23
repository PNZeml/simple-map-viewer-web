import {action, observable} from "mobx";
import {inject} from "inversify-props";
import UserWebApiService from "@/data/webapi/services/user/UserWebApiService";
import {GeoFilesWebApiService} from "@/data/webapi/services/geofile/GeoFilesWebApiService";

export default class GeoFilesUploadDialogViewModel {
    @inject("UserWebApiService")
    private userService!: UserWebApiService;
    @inject("GeoFilesWebApiService")
    private foo!: GeoFilesWebApiService;

    @observable
    public isDialogShown = false;

    @action
    public async loadAllBy(searchQuery: string) {
        console.log("TODO")
    }

    @action
    public async fake() {
        await this.foo.fake();
    }
}