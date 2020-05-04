import AuthStoreModule from "@/features/auth/AuthStoreModule";
import {Route} from "vue-router";

export default class RouterUtils {
    public static RouteNotAuthenticated(to: Route, from: Route, next: any): void {
        if (AuthStoreModule.token) {
            next("/map");
            return;
        }
        next();
    }

    public static RouteAuthenticated(to: Route, from: Route, next: any) : void {
        if (!AuthStoreModule.token) {
            next("/signin");
            return;
        }
        next();
    }
}
