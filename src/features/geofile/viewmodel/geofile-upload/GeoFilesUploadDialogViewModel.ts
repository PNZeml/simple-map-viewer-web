import {action, observable} from "mobx";
import {inject} from "inversify-props";
import UserWebApiService from "@/data/webapi/services/user/UserWebApiService";

export default class GeoFilesUploadDialogViewModel {
    @inject("UserWebApiService")
    private userService!: UserWebApiService;

    @observable
    public isDialogShown = false;

    @action
    public async loadAllBy(searchQuery: string) {
        console.log("TODO")
    }
}