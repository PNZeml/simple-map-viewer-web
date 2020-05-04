import RouterUtils from "@/common/utils/RouterUtils";
import SignInView from "@/features/auth/views/SignInView.vue";
import SignUpView from "@/features/auth/views/SignUpView.vue";
import {RouteConfig} from "vue-router";

const AuthRouteConfig: Array<RouteConfig> = [
    {
        path: "/signin",
        name: "signin",
        component: SignInView,
        beforeEnter: RouterUtils.RouteNotAuthenticated
    },
    {
        path: "/signup",
        name: "signup",
        component: SignUpView,
        beforeEnter: RouterUtils.RouteNotAuthenticated
    }
];

export default AuthRouteConfig;