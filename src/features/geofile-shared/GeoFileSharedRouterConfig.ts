import {RouteConfig} from "vue-router";
import GeoFileSharedView from "@/features/geofile-shared/views/GeoFileSharedView.vue";
import RouterUtils from "@/common/utils/RouterUtils";

const GeoFileSharedRouteConfig: Array<RouteConfig> = [
    {
        path: "/shared-with-me",
        name: "geofile-shared",
        component: GeoFileSharedView,
        beforeEnter: RouterUtils.RouteAuthenticated,
    },
]

export default GeoFileSharedRouteConfig;
