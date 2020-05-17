import {RouteConfig} from "vue-router";
import GeoFilesView from "@/features/geofile/views/GeoFileView.vue";
import RouterUtils from "@/common/utils/RouterUtils";

const GeoFileRouterConfig: Array<RouteConfig> = [
    {
        path: "/geofile",
        name: "files",
        component: GeoFilesView,
        beforeEnter: RouterUtils.RouteAuthenticated,
    },
];

export default GeoFileRouterConfig;