import {RouteConfig} from "vue-router";
import GeoFilesView from "@/features/geofiles/views/GeoFilesView.vue";
import RouterUtils from "@/common/utils/RouterUtils";

const GeoFilesRouterConfig: Array<RouteConfig> = [
    {
        path: "/geofiles",
        name: "files",
        component: GeoFilesView,
        beforeEnter: RouterUtils.RouteAuthenticated,
    },
];

export default GeoFilesRouterConfig;