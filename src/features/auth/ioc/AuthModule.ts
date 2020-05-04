import {container} from "inversify-props";
import {AuthWebApiService} from "@/features/auth/services/AuthWebApiService";
import AuthWebApiServiceImpl from "@/features/auth/services/AuthWebApiServiceImpl";

function load(): void {
    container.addTransient<AuthWebApiService>(AuthWebApiServiceImpl, "AuthService");
}

export const AuthModuleLoad = load();