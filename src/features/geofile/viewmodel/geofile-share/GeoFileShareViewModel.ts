import {action, computed, observable} from "mobx";
import {inject} from "inversify-props";
import UserWebApiService from "@/data/webapi/user/UserWebApiService";
import UserDto from "@/domain/dtos/user/UserDto";
import {LoadingState} from "@/domain/enums/LoadingState";
import {AccessType, toReadable} from "@/domain/enums/AccessType";
import {GeoFilesWebApiService} from "@/data/webapi/geofile/GeoFilesWebApiService";
import LocalStorageUtils from "@/common/utils/LocalStorageUtils";
import {GeoFile} from "@/domain/models/GeoFile";
import UserAccessTypeDto from "@/domain/dtos/user/UserAccessTypeDto";

export default class GeoFileShareViewModel {
    @inject("UserWebApiService")
    private readonly userService!: UserWebApiService;
    @inject("GeoFilesWebApiService")
    private readonly geoFileService!: GeoFilesWebApiService;

    @observable
    public isDialogShown = false;
    @observable
    public geoFile: GeoFile | null = null;
    @observable
    public users: Array<UserDto> = [];
    @observable
    public userAccessTypes: Array<UserAccessTypeDto> = [];
    @observable
    public usersLoadingState: LoadingState = LoadingState.Pending;
    @observable
    public accessTypes = [
        { text: toReadable(AccessType.Watch), value: AccessType.Watch.valueOf() },
        { text: toReadable(AccessType.Comment), value: AccessType.Comment.valueOf() },
        { text: toReadable(AccessType.Edit), value: AccessType.Edit.valueOf() }
    ];
    @observable
    public selectedAccessType = this.accessTypes[0];
    @observable
    public selectedUsers: Array<UserDto> = [];

    @computed
    public get areUsersLoading(): boolean {
        return this.usersLoadingState == LoadingState.Loading;
    }

    @action
    public async loadUsersBySearchQuery(searchQuery: string) {
        try {
            this.usersLoadingState = LoadingState.Loading;
            this.users = await this.userService.getAllBySearchQuery({searchString: searchQuery});
            this.usersLoadingState = LoadingState.Success;
        } catch (error) {
            this.usersLoadingState = LoadingState.Error;
        }
    }

    @action
    public async loadUsersByGeoFile() {
        const foo = await this.geoFileService.getGeoFile(this.geoFile!.id);
        this.userAccessTypes = foo.users;
    }

    @action
    public async share() {
        await this.geoFileService.share(
            this.geoFile?.id!,
            {
                accessType: this.selectedAccessType.value,
                userIds: this.selectedUsers.map(x => x.id),
            }
        )
    }
}