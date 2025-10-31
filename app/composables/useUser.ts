import type { User } from "better-auth"

export const useUser = () => {
    const user = useState<User | null>('user', () => null)

    const getCurrentUser = async () => {
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
        }
    }

    const login = async (email: string, password: string) => {
        const { data, error } = await authClient.signIn.email({
            email,
            password
        })

        if (error) {
            throw new Error(error.message || 'Unknown error during login')
        }

        await getCurrentUser()
        return data
    }

    const loginWithGoogle = async() => {
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
        return data

    }

    const logout = async () => {

        user.value = null
        await authClient.signOut()
    }

    return {
        user,
        getCurrentUser,
        login,
        loginWithGoogle,
        logout
    }
}