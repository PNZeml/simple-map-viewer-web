import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import LocalStorageUtils from "@/common/utils/LocalStorageUtils";

class SignalRService {
    public readonly hubConnection: HubConnection;

    constructor() {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(
                "http://192.168.0.104:5001/hubs/v1/map",
                {
                    accessTokenFactory: () => {
                        return LocalStorageUtils.getToken();
                    }
                }
            )
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Debug)
            .build();
    }
}

const signalRService = new SignalRService();

export default signalRService;