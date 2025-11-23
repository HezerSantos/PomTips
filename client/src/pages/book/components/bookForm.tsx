import React, { useState, SetStateAction } from "react"
import BookInput from "./bookInput"
import api from "../../../app.config"
import handleApiError from "../../../app.config.error"
import { AxiosError } from "axios"
import useGlobalContext from "../../../customHooks/useGlobalContext"
import BookFile from "./bookFile"

interface BookFormProps {
    selectedDate: Date | null
    times: string[]
    baseServices: string[]
    addOns: string[]
    upgrades: string[]
}

interface ErrorType {
    msg: string,
    isError: boolean
}


type MakeAppointmentType = (
    bookData: Record<string, any> | null,
    selectedFile: File | null,
    globalContext: GlobalContextType,
    setBookData: React.Dispatch<SetStateAction<Record<string, any> | null>>,
    setSelectedFile: React.Dispatch<SetStateAction<File | null>>,
    setErrors: React.Dispatch<SetStateAction<Map<string, ErrorType | null>>>,
    errors: Map<string, ErrorType | null>,
    newCsrf?: string
) => Promise<void>

const makeAppointment: MakeAppointmentType = async(bookData, selectedFile, globalContext, setBookData, setSelectedFile, setErrors, errors, newCsrf)=> {    
    try{
        const formData = new FormData()

        if (bookData) {
            Object.entries(bookData).forEach(([key, value]) => {
                formData.append(key, value === null? "" : value)
            })
        }
    
        if (selectedFile) {
            setErrors(prev => {
                const newMap = new Map(prev)
                newMap.set("file", null)
                return newMap
            })
            formData.append("refImage", selectedFile)
        } else {
            setErrors(prev => {
                const newMap = new Map(prev)
                newMap.set("file", {msg: "Invalid Upload", isError: true})
                return newMap
            })
        }
        await api.post("/api/appointments",
            formData
        , 
        {
            headers: {
                csrftoken: newCsrf? newCsrf : globalContext.csrf?.csrfToken
            }
        })
        setBookData(null)
        setSelectedFile(null)
        setErrors(prev => {
            const newMap = new Map(prev)
            for (const [key] of newMap) {
                newMap.set(key, null)
            }
            return newMap
        })
    } catch(e) {
        const axiosError = e as AxiosError
        handleApiError(
            {
                axiosError: axiosError,
                status: axiosError.status,
                globalContext: globalContext,
                callbacks: {
                    handlePublicAuthRetry: () => makeAppointment(bookData, selectedFile, globalContext, setBookData, setSelectedFile, setErrors, errors),
                    handleCsrfRetry: (newCsrf) => makeAppointment(bookData, selectedFile, globalContext, setBookData, setSelectedFile, setErrors, errors, newCsrf)
                },
                refactoredErrors: [...errors].map(([key]) => {
                    return {errorName: key, setState: setErrors}
                })
            }
        )
    }
}

const BookForm: React.FC<BookFormProps> = ({selectedDate, times, baseServices, addOns, upgrades}) => {
    const [ bookData, setBookData ] = useState<Record<string, any> | null>(null)
    const [ selectedFile, setSelectedFile ] = useState<File | null>(null)
    const globalContext = useGlobalContext()
    const [errors, setErrors] = useState<Map<string, ErrorType | null>>(new Map([
        ["date", null],
        ["time", null],
        ["name", null],
        ["email", null],
        ["service", null],
        ["addon", null],
        ["upgrade", null],
        ["file", null],
    ]))

    return(
        <>
            <div className="book-form">
                <h1>Book Your Session</h1>
                <div className="book-form-inputs">
                    <BookInput label="Date" name="date" type="date" bookData={bookData} setBookData={setBookData} readonly={true} selectedDate={selectedDate} refactoredErrors={errors}/>
                    <BookInput label="Time" name="time" type="" bookData={bookData} setBookData={setBookData} select={true} options={times} defaultMsg="Select a Time" refactoredErrors={errors}/>
                    <BookInput label="Name" name="name" bookData={bookData} setBookData={setBookData}type="text" refactoredErrors={errors}/>
                    <BookInput label="Email" name="email" bookData={bookData} setBookData={setBookData} type="text" refactoredErrors={errors}/>
                    <BookInput label="Service" name="service" type="" bookData={bookData} setBookData={setBookData} select={true} options={baseServices} defaultMsg="Select a Service" refactoredErrors={errors}/>
                    <BookInput label="Add On" name="addon" type="" bookData={bookData} setBookData={setBookData} select={true} options={addOns} defaultMsg="Select an Addon" refactoredErrors={errors}/>
                    <BookInput label="Upgrade" name="upgrade" type="" bookData={bookData} setBookData={setBookData} select={true} options={upgrades} defaultMsg="Select an Upgrade" refactoredErrors={errors}/>
                    <BookFile selectedFile={selectedFile} setSelectedFile={setSelectedFile} errors={errors}/>
                </div>
                <p>*A $25 deposit is required to book an appointment</p>
                <div className="book-form-footer">
                    <button onClick={() => makeAppointment(
                        bookData, 
                        selectedFile, 
                        globalContext, 
                        setBookData,
                        setSelectedFile,
                        setErrors,
                        errors
                    )}>
                            Book Session
                    </button>
                    <p>*By clicking this you agree to our Terms</p>
                </div>
            </div>
        </>
    )
}

export default BookForm