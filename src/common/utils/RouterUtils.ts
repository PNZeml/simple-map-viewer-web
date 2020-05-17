import AuthStoreModule from "@/features/auth/viewmodel/auth/AuthViewModelImpl";
import {Route} from "vue-router";
import LocalStorageUtils from "@/common/utils/LocalStorageUtils";

export default class RouterUtils {
    public static RouteNotAuthenticated(to: Route, from: Route, next: any): void {
        if (LocalStorageUtils.GetUser() != null) {
            next("/map");
            return;
        }
        next();
    }

    public static RouteAuthenticated(to: Route, from: Route, next: any) : void {
        if (LocalStorageUtils.GetUser() == null) {
            next("/signin");
            return;
        }
        next();
    }
}
