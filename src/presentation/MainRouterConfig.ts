import RouterUtils from "@/common/utils/RouterUtils";
import GeoFilesView from "@/features/geofiles/views/GeoFilesView.vue";
import MapView from "@/features/map/views/MapView.vue";
import MainPageComponent from "@/presentation/views/MainView.vue";
import {RouteConfig} from "vue-router";

const MainRouterConfig: Array<RouteConfig> = [
    {
        path: "/map",
        component: MainPageComponent,
        children: [
            {
                path: "/map/:id",
                name: "map",
                component: MapView,
            },
            {
                path: "/geofiles",
                name: "files",
                component: GeoFilesView,
                beforeEnter: RouterUtils.RouteAuthenticated,
            },
        ],
    },
];

export default MainRouterConfig;