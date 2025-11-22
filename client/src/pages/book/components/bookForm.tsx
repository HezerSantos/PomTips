import React, { useState, SetStateAction } from "react"
import BookInput from "./bookInput"
import api from "../../../app.config"
import handleApiError from "../../../app.config.error"
import { AxiosError } from "axios"
import useGlobalContext from "../../../customHooks/useGlobalContext"

interface BookFormProps {
    selectedDate: Date | null
    times: string[]
}

interface ErrorType {
    msg: string,
    isError: boolean
}


type MakeAppointmentType = (
    bookData: Record<string, any> | null,
    globalContext: GlobalContextType,
    setDateError: React.Dispatch<SetStateAction<ErrorType | null>>,
    setTimeError: React.Dispatch<SetStateAction<ErrorType | null>>,
    setNameError: React.Dispatch<SetStateAction<ErrorType | null>>,
    setEmailError: React.Dispatch<SetStateAction<ErrorType | null>>,
    newCsrf?: string
) => Promise<void>

const makeAppointment: MakeAppointmentType = async(bookData, globalContext, setDateError, setTimeError, setNameError, setEmailError, newCsrf)=> {
    try{
        const res = await api.post("/api/appointments", {
            bookData
        }, 
        {
            headers: {
                csrftoken: newCsrf? newCsrf : globalContext.csrf?.csrfToken
            }
        })
        console.log(res)
    } catch(e) {
        const axiosError = e as AxiosError
        console.log(axiosError)
        handleApiError(
            {
                axiosError: axiosError,
                status: axiosError.status,
                globalContext: globalContext,
                callbacks: {
                    handlePublicAuthRetry: () => makeAppointment(bookData, globalContext, setDateError, setTimeError, setNameError, setEmailError),
                    handleCsrfRetry: (newCsrf) => makeAppointment(bookData, globalContext, setDateError, setTimeError, setNameError, setEmailError, newCsrf)
                },
                setStateErrors: [
                    {
                        errorName: "date",
                        setState: setDateError
                    },
                    {
                        errorName: "time",
                        setState: setTimeError
                    },
                    {
                        errorName: "name",
                        setState: setNameError
                    },
                    {
                        errorName: "email",
                        setState: setEmailError
                    }
                ]
            }
        )
    }
}

const BookForm: React.FC<BookFormProps> = ({selectedDate, times}) => {
    const [ bookData, setBookData ] = useState<Record<string, any> | null>(null)
    const [ dateError, setDateError ] = useState<ErrorType | null>(null)
    const [ timeError, setTimeError ] = useState<ErrorType | null>(null)
    const [ nameError, setNameError ] = useState<ErrorType | null>(null)
    const [ emailError, setEmailError ] = useState<ErrorType | null>(null)

    const globalContext = useGlobalContext()

    return(
        <>
            <div className="book-form">
                <h1>Book Your Session</h1>
                <div className="book-form-inputs">
                    <BookInput label="Date" name="date" type="date" setBookData={setBookData} error={dateError} readonly={true} selectedDate={selectedDate}/>
                    <BookInput label="Time" name="time" type="" setBookData={setBookData} error={timeError} select={true} times={times}/>
                    <BookInput label="Name" name="name" setBookData={setBookData} error={nameError} type="text"/>
                    <BookInput label="Email" name="email" setBookData={setBookData} error={emailError} type="text"/>
                </div>
                <p>*A $25 deposit is required to book an appointment</p>
                <div className="book-form-footer">
                    <button onClick={() => makeAppointment(bookData, globalContext, setDateError, setTimeError, setNameError, setEmailError)}>Book Session</button>
                    <p>*By clicking this you agree to our Terms</p>
                </div>
            </div>
        </>
    )
}

export default BookForm