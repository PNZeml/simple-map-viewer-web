import {HubConnectionBuilder, LogLevel, HubConnection} from "@microsoft/signalr";

class SignalRService {
    public readonly hubConnection: HubConnection;

    constructor() {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl("http://192.168.0.102:5001/hubs/v1/map")
            .configureLogging(LogLevel.Debug)
            .build();
    }
}

const signalRService = new SignalRService();

export default signalRService;