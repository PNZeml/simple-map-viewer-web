import WebApiService from "@/domain/services/webapi/WebApiService"
import {AuthWebApiService} from "@/features/auth/services/AuthWebApiService";

export default class AuthWebApiServiceImpl extends WebApiService implements AuthWebApiService {
    public async signIn(signIn: SignInDto): Promise<User> {
        const response = await this.create<User>("signin", signIn);
        return response.data;
    }

    public async signUp(signUp: SignUpDto): Promise<void> {
        await this.create("signup", signUp);
    }
}
