export interface AuthViewModel {
    user: User | null
    readonly token: string | null

    requestSignUp(signUp: SignUpDto): Promise<void>

    requestSignIn(signIn: SignInDto): Promise<void>

    signOut(): void
}