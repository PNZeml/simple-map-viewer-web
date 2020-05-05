import MapView from "@/features/map/views/MapView.vue";
import {RouteConfig} from "vue-router";

const MapRouteConfig: Array<RouteConfig> = [
    {
        path: "/map",
        component: MapView,
    },
    {
        path: "/map/:geoFileId",
        component: MapView,
    }
];

export default MapRouteConfig;