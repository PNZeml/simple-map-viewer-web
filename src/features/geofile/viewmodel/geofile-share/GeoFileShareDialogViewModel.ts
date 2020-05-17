import {computed, observable} from "mobx";
import {inject} from "inversify-props";
import UserWebApiService from "@/data/webapi/services/user/UserWebApiService";
import UserDto from "@/domain/dtos/user/UserDto";
import {LoadingState} from "@/domain/enums/LoadingState";

export default class GeoFileShareDialogViewModel {
    @inject("UserWebApiService")
    private readonly userService!: UserWebApiService;

    @observable
    public isDialogShown = false;
    @observable
    public users: Array<UserDto> = [];
    @observable
    public usersLoadingState: LoadingState = LoadingState.Pending;
    @observable
    public selectedUsers: Array<UserDto> = [];

    @computed
    public get areUsersLoading(): boolean {
        return this.usersLoadingState == LoadingState.Loading;
    }

    public async loadUsersBySearchQuery(searchQuery: string) {
        try {
            this.usersLoadingState = LoadingState.Loading;
            this.users = await this.userService.getAllBy({searchQuery});
            this.usersLoadingState = LoadingState.Success;
        } catch (error) {
            this.usersLoadingState = LoadingState.Error;
        }
    }
}