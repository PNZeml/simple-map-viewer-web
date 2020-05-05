import {container} from "inversify-props";
import {AuthWebApiService} from "@/features/auth/services/AuthWebApiService";
import AuthWebApiServiceImpl from "@/features/auth/services/AuthWebApiServiceImpl";
import {AuthViewModel} from "@/features/auth/viewmodel/AuthViewModel";
import AuthViewModelImpl from "@/features/auth/viewmodel/AuthViewModelImpl";

function load(): void {
    container.addSingleton<AuthViewModel>(AuthViewModelImpl, "AuthViewModel");
    container.addTransient<AuthWebApiService>(AuthWebApiServiceImpl, "AuthWebApiService");
}

export const AuthModuleLoad = load();