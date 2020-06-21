export interface AuthWebApiService {
    signIn(signInDto: SignInRequestDto): Promise<User>

    signUp(signUpDto: SignUpRequestDto): Promise<void>
}