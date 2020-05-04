export interface AuthWebApiService {
    signIn(signIn: SignInDto): Promise<User>

    signUp(signUp: SignUpDto): Promise<void>
}