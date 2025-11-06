import { useContext } from "react"
import AuthContext from "../context/auth/authContext"
import CsrfContext from "../context/csrf/csrfContext"
import ErrorContext from "../context/error/errorContext"

type UseGlobalContextType = (
    authContextParameters?: AuthContextType
) => { auth: AuthContextType | null, csrf: CsrfContextType | null, error: ErrorContextType | null}

const useGlobalContext: UseGlobalContextType = (authContextParameters) => {
    const auth = useContext(AuthContext)
    const csrf = useContext(CsrfContext)
    const error = useContext(ErrorContext)

    return { 
        auth: auth? auth : authContextParameters ?? null, 
        csrf, 
        error 
    }
}

export default useGlobalContext