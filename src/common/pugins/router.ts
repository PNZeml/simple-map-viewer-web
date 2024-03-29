import AuthRouteConfig from "@/features/auth/AuthRouteConfig";
import Vue from "vue";
import VueRouter, {RouteConfig} from "vue-router";
import MapRouteConfig from "@/features/map/MapRouterConfing";
import GeoFileRouterConfig from "@/features/geofile/GeoFileRouterConfig";
import MainPageComponent from "@/presentation/views/MainView.vue";
import GeoFileSharedRouteConfig from "@/features/geofile-shared/GeoFileSharedRouterConfig";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        component: MainPageComponent,
        children: [
            ...GeoFileRouterConfig,
            ...GeoFileSharedRouteConfig,
            ...MapRouteConfig,
        ]
    },
    ...AuthRouteConfig,
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
