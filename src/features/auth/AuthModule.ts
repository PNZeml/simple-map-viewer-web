import {container} from "inversify-props";
import {AuthViewModel} from "@/features/auth/viewmodel/auth/AuthViewModel";
import AuthViewModelImpl from "@/features/auth/viewmodel/auth/AuthViewModelImpl";

function load(): void {
    container.addSingleton<AuthViewModel>(
        AuthViewModelImpl,
        "AuthViewModel"
    );
}

export const AuthModule = load();