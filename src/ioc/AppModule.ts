import {AuthModule} from "@/features/auth/AuthModule";
import {GeoFileModule} from "@/features/geofile/GeoFileModule";
import {WebApiModule} from "@/data/webapi/WebApiModule";

function load(): void {
    // Infrastructure
    WebApiModule;
    // Features
    AuthModule;
    GeoFileModule;
}

export const AppModule = load();