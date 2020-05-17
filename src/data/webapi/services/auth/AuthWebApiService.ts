export interface AuthWebApiService {
    signIn(signInDto: SignInDto): Promise<User>

    signUp(signUpDto: SignUpDto): Promise<void>
}