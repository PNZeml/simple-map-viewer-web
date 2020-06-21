import {AuthWebApiService} from "@/data/webapi/auth/AuthWebApiService";
import {inject} from "inversify-props";
import LocalStorageUtils from "@/common/utils/LocalStorageUtils";
import {AuthViewModel} from "@/features/auth/viewmodel/auth/AuthViewModel";
import {action, computed, observable} from "mobx";

export default class AuthViewModelImpl implements AuthViewModel {
    @inject("AuthWebApiService")
    private authService!: AuthWebApiService;

    @observable
    public user: User | null = LocalStorageUtils.getUser();

    @computed
    public get token(): string | null {
        return (this.user && this.user.accessToken) || null;
    }

    @action
    public async requestSignUp(signUp: SignUpRequestDto): Promise<void> {
        await this.authService.signUp(signUp);
    }

    @action
    public async requestSignIn(signIn: SignInRequestDto): Promise<void> {
        this.user = await this.authService.signIn(signIn);
        localStorage.setItem("user", JSON.stringify(this.user));
    }

    @action
    public signOut(): void {
        this.user = null;
        window.localStorage.clear();
    }
}
