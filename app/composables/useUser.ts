import type { User } from "better-auth"
import type { Role } from "@/generated/prisma/client"

export type AuthUser = User & {
    role?: Role | null
}

type AuthSignInResult = (Record<string, unknown> & { user: AuthUser })

export const useUser = () => {
    const user = useState<AuthUser | null>('user', () => null)
    const isClient = import.meta.client
    const { start, finish } = useLoadingIndicator()

    const startIndicator = () => {
        if (isClient) {
            start()
        }
    }

    const finishIndicator = () => {
        if (isClient) {
            finish()
        }
    }

    const getCurrentUser = async () => {
        startIndicator()
        try {
            const session = await authClient.getSession({
                fetchOptions: {
                    headers: useRequestHeaders(['cookie'])
                }
            })
            if (session.error || !session.data) {
                user.value = null
                return
            }
            
            user.value = session.data.user as AuthUser
        } catch (error) {
            console.error(error)
            user.value = null
        } finally {
            finishIndicator()
        }
    }

    const login = async (email: string, password: string): Promise<AuthSignInResult> => {
        startIndicator()
        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password
            })
            if (error) {
                throw new Error(error.message || 'Unknown error during login')
            }

            if (!data) {
                throw new Error('Missing authentication data')
            }

            await getCurrentUser()
            return data as AuthSignInResult
        } finally {
            finishIndicator()
        }
    }

    const loginWithGoogle = async (): Promise<AuthSignInResult> => {
        startIndicator()
        try {
            const { data, error } = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/", // เมื่อสำเร็จ redirect ไปหน้าไหน
                errorCallbackURL: "/login" // ถ้ามีผิดพลาด
            })

            if (error) {
                console.log("Google sign-in failes: ", error)
                throw new Error(error.message || 'Unknown error during login')
            }

            console.log("Signed in:", data);
            await getCurrentUser()
            if (!data) {
                throw new Error('Missing authentication data')
            }

            return data as AuthSignInResult
        } finally {
            finishIndicator()
        }

    }

    const loginWithLine = async (accessToken: string, idToken: string): Promise<AuthSignInResult> => {
        startIndicator()
        try {
            const { data, error } = await authClient.signIn.social({
                provider: "line",
                idToken: {
                    token: idToken,
                    accessToken: accessToken
                },
                errorCallbackURL: "/login" // ถ้ามีผิดพลาด
            })

            if (error) {
                console.log("Line sign-in failes: ", error)
                throw new Error(error.message || 'Unknown error during login')
            }

            console.log("Signed in:", data);
            await getCurrentUser()
            if (!data) {
                throw new Error('Missing authentication data')
            }

            return data as AuthSignInResult
        } finally {
            finishIndicator()
        }
    }

    const logout = async () => {
        startIndicator()
        try {
            user.value = null
            await authClient.signOut()
        } finally {
            finishIndicator()
        }
    }

    return {
        user,
        getCurrentUser,
        login,
        loginWithGoogle,
        loginWithLine,
        logout
    }
}