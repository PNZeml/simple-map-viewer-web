export interface AuthViewModel {
    user: User | null
    readonly token: string | null

    requestSignUp(signUp: SignUpRequestDto): Promise<void>

    requestSignIn(signIn: SignInRequestDto): Promise<void>

    signOut(): void
}