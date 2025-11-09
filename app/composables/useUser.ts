import type { User } from "better-auth"

export const useUser = () => {
    const user = useState<User | null>('user', () => null)
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
            console.log(session)
            user.value = session.data.user
        } catch (error) {
            console.error(error)
            user.value = null
        } finally {
            finishIndicator()
        }
    }

    const login = async (email: string, password: string) => {
        startIndicator()
        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password
            })
            if (error) {
                throw new Error(error.message || 'Unknown error during login')
            }

            await getCurrentUser()
            return data
        } finally {
            finishIndicator()
        }
    }

    const loginWithGoogle = async() => {
        startIndicator()
        try {
            const { data, error } = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/", // เมื่อสำเร็จ redirect ไปหน้าไหน
                errorCallbackURL: "/login" // ถ้ามีผิดพลาด
            })

            if(error) {
                console.log("Google sign-in failes: ", error)
                throw new Error(error.message || 'Unknown error during login')
            }

            console.log("Signed in:", data);
            await getCurrentUser()
            return data
        } finally {
            finishIndicator()
        }

    }

    const loginWithLine = async (accessToken: string, idToken: string) => {
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

            if(error) {
                console.log("Line sign-in failes: ", error)
                throw new Error(error.message || 'Unknown error during login')
            }

            console.log("Signed in:", data);
            await getCurrentUser()
            return data
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