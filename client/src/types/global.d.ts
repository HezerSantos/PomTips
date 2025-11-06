import React, { SetStateAction } from "react";
export {};

declare global {

    interface AuthContextType {
        refresh: (newCsrf?: string | null) => void,
        isAuthState: {isAuth: boolean, isAuthLoading: boolean},
        setIsAuthState: React.Dispatch<SetStateAction<{isAuth: boolean, isAuthLoading: boolean}>>,
        logout: () => void
    }

    interface CsrfContextType {
        csrfToken: string | null
        decodeCookie: (cookie: string) => void
        getCsrf: () => Promise<string | undefined>
    }

    interface ValidationErrorType {
        type: 'field' | 'alternative' | 'grouped_alternative' | 'unknown_fields';
        location: 'body' | 'query' | 'params' | 'headers' | 'cookies';
        path: string;
        value: any;
        msg: string;
        nestedErrors?: ValidationErrorType[];
    }



    interface ApiErrorType {
        msg: string,
        code: string,
        validationErrors?: ValidationErrorType[]
    }


    interface GlobalErrorType {
        isError: boolean,
        status: number | null
    }
    interface ErrorContextType {
        error: GlobalErrorType,
        setError: React.Dispatch<SetStateAction<GlobalErrorType>>
    }

    interface GlobalContextType {
        auth: AuthContextType | null,
        csrf: CsrfContextType | null,
        error: ErrorContextType | null
    }
}