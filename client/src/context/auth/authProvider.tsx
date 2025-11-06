import React, { ReactNode, useCallback, useState } from "react"
import AuthContext from "./authContext"
import api from "../../app.config"
import { AxiosError } from "axios"
import handleApiError from "../../app.config.error"
import useGlobalContext from "../../customHooks/useGlobalContext"

interface AuthProviderProps {
    children: ReactNode
}


type RefreshType = (newCsrf?: string | null) => Promise<boolean | void>



const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [ isAuthState, setIsAuthState ] = useState({isAuth: false, isAuthLoading: true})
    let globalContext: ReturnType<typeof useGlobalContext>
    // const globalContext = useGlobalContext()
    const logout = useCallback(() => {
        setIsAuthState({isAuth: false, isAuthLoading: false})
    }, [])


    const refresh: RefreshType = useCallback(async (newCsrf) => {
        try {
            setIsAuthState({isAuth: false, isAuthLoading: true})
            await api.get("/api/auth/secure/refresh", {
                headers: {
                    csrftoken: newCsrf? newCsrf : globalContext.csrf?.csrfToken
                }
            });
            setIsAuthState({isAuth: true, isAuthLoading: false})
            return true
        } catch (error) {
            const axiosError = error as AxiosError
            //SIDE NOTE: I PROBABLY HAD TO RETURN THE ERROR HELPER AND STATE THE RETURN VALUE SO THAT THERE IS A RETURN VALUE FOR REFRESH
            return handleApiError({
                axiosError: axiosError,
                status: axiosError.status,
                globalContext,
                callbacks: {
                    handlePublicAuthRetry: () => refresh(),
                    handleCsrfRetry: (newCsrf) => refresh(newCsrf)
                }
            })
        }
    }, [logout]);

    globalContext = useGlobalContext({refresh, isAuthState, setIsAuthState, logout})
    return(
        <AuthContext.Provider value={{refresh, isAuthState, setIsAuthState, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider