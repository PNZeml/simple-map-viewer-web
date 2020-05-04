import store from "@/common/pugins/store";
import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {AuthWebApiService} from "@/features/auth/services/AuthWebApiService";
import {inject} from "inversify-props";
import LocalStorageUtils from "@/common/utils/LocalStorageUtils";

@Module({
    namespaced: true,
    name: "auth",
    store,
    dynamic: true,
})
class AuthStoreModule extends VuexModule {
    public user: User | null = LocalStorageUtils.getUser();

    @inject()
    private authService!: AuthWebApiService;

    get token(): string | null {
        return (this.user && this.user.accessToken) || null;
    }

    @Mutation
    private SignInSuccess(user: User): void {
        localStorage.setItem("user", JSON.stringify(user));
        this.user = user;
    }

    @Mutation
    private SignOutSuccess(): void {
        window.localStorage.clear();
        this.user = null;
    }

    @Action
    public async RequestSignUp(signUp: SignUpDto): Promise<void> {
        await this.authService.signUp(signUp);
    }

    @Action({rawError: true})
    public async RequestSignIn(signIn: SignInDto): Promise<void> {
        const user = await this.authService.signIn(signIn);
        this.context.commit("SignInSuccess", user)
    }

    @Action
    public RequestSignOut(): void {
        this.context.commit("SignOutSuccess");
    }
}

export default getModule(AuthStoreModule);