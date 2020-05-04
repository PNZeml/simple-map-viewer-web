import AuthRouteConfig from "@/features/auth/AuthRouteConfig";
import MainRouterConfig from "@/presentation/MainRouterConfig";
import Vue from "vue";
import VueRouter, {RouteConfig} from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    ...MainRouterConfig,
    ...AuthRouteConfig,
    //...MapRouteConfig,
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
