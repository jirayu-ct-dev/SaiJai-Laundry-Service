import type { User } from "better-auth"

export const useUser = () => {
    const user = useState<User | null>('user', () => null)
    const { start, finish } = useLoadingIndicator()

    const getCurrentUser = async () => {
        try {
            start()
            const session = await authClient.getSession({
                fetchOptions: {
                    headers: useRequestHeaders(['cookie'])
                }
            })
            finish()
            if (session.error || !session.data) {
                user.value = null
                return
            }
            console.log(session)
            user.value = session.data.user
        } catch (error) {
            console.error(error)
            user.value = null
        }
    }

    const login = async (email: string, password: string) => {
        start()
        const { data, error } = await authClient.signIn.email({
            email,
            password
        })
        finish()
        if (error) {
            throw new Error(error.message || 'Unknown error during login')
        }

        await getCurrentUser()
        return data
    }

    const loginWithGoogle = async() => {
        start()
        const { data, error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/", // เมื่อสำเร็จ redirect ไปหน้าไหน
            errorCallbackURL: "/login" // ถ้ามีผิดพลาด
        })
        finish()

        if(error) {
            console.log("Google sign-in failes: ", error)
            throw new Error(error.message || 'Unknown error during login')
        }

        console.log("Signed in:", data);
        return data

    }

    const loginWithLine = async (accessToken: string, idToken: string) => {
        start()
        const { data, error } = await authClient.signIn.social({
            provider: "line",
            idToken: {
                token: idToken,
                accessToken: accessToken
            },
            errorCallbackURL: "/login" // ถ้ามีผิดพลาด
        })
        finish()

        if(error) {
            console.log("Line sign-in failes: ", error)
            throw new Error(error.message || 'Unknown error during login')
        }

        console.log("Signed in:", data);
        return data
    }

    const logout = async () => {
        start()
        user.value = null
        await authClient.signOut()
        finish()
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