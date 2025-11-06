import { ReactNode, useState } from "react"
import ErrorContext from "./errorContext"


interface ErrorProviderProps {
    children: ReactNode
}
const ErrorProvider: React.FC<ErrorProviderProps> = ({children}) => {
    const [ error, setError ] = useState<GlobalErrorType>({isError: false, status: null})

    return (
        <ErrorContext.Provider value={{error, setError}}>
            {children}
        </ErrorContext.Provider>
    )
}

export default ErrorProvider