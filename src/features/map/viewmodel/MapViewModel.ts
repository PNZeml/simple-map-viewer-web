import LocalStorageUtils from "@/common/utils/LocalStorageUtils";
import {action, computed, observable} from "mobx";
import signalRService from "@/data/signalr/SignalRService";
import UserDto from "@/domain/dtos/user/UserDto";
import {GeoJSON} from "geojson";
import MapWebApiServiceImpl from "@/features/map/services/MapWebApiServiceImpl";
import CommentDto from "@/domain/dtos/message/CommentDto";

export default class MapViewModel {
    private mapService = new MapWebApiServiceImpl();

    @observable
    public user: User | null = LocalStorageUtils.getUser();
    @observable
    public users: Array<UserDto> = new Array<UserDto>();
    @observable
    public comments: Array<CommentDto> = new Array<CommentDto>();

    @observable
    public geoFileId?: number;
    @observable
    public geoFile?: GeoJSON;

    @computed
    public get token(): string | null {
        return (this.user && this.user.accessToken) || null;
    }

    @action
    public async FetchGeoFile(geoFileId: number): Promise<void> {
        this.geoFileId = geoFileId;
        this.geoFile = await this.mapService.openGeoFile(geoFileId);
    }

    @action
    public async InitHubConnection(): Promise<void> {
        await signalRService.hubConnection.start();
        // Setup events
        signalRService.hubConnection.on("UsersUpdated", (users: Array<UserDto>) => {
            this.users = users;
        });
        // Joint to GeoFile group
        await signalRService.hubConnection.invoke("Join", this.geoFileId);
    }

    @action
    public async CloseHubConnection() {
        await signalRService.hubConnection.stop();
    }
}
