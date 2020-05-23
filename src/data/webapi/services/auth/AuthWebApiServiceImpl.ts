import WebApiService from "@/data/webapi/WebApiService"
import {AuthWebApiService} from "@/data/webapi/services/auth/AuthWebApiService";

export default class AuthWebApiServiceImpl extends WebApiService implements AuthWebApiService {
    public async signIn(request: SignInRequestDto): Promise<User> {
        const response = await this.create<User>("signin", request);
        console.log(response.data);
        return response.data;
    }

    public async signUp(request: SignUpRequestDto): Promise<void> {
        await this.create("signup", request);
    }
}
