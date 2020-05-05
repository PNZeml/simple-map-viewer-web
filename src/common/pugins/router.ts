import AuthRouteConfig from "@/features/auth/AuthRouteConfig";
import Vue from "vue";
import VueRouter, {RouteConfig} from "vue-router";
import MapRouteConfig from "@/features/map/MapRouterConfing";
import GeoFilesRouterConfig from "@/features/geofiles/GeoFilesRouterConfig";
import MainPageComponent from "@/presentation/views/MainView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        component: MainPageComponent,
        children: [
            ...GeoFilesRouterConfig,
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
