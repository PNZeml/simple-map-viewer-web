import WebApiService from "@/data/webapi/WebApiService"
import {AuthWebApiService} from "@/data/webapi/services/auth/AuthWebApiService";

export default class AuthWebApiServiceImpl extends WebApiService implements AuthWebApiService {
    public async signIn(signIn: SignInDto): Promise<User> {
        const response = await this.create<User>("signin", signIn);
        console.log(response.data);
        return response.data;
    }

    public async signUp(signUp: SignUpDto): Promise<void> {
        await this.create("signup", signUp);
    }
}
