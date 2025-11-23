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
    setDateError: React.Dispatch<SetStateAction<ErrorType | null>>,
    setTimeError: React.Dispatch<SetStateAction<ErrorType | null>>,
    setNameError: React.Dispatch<SetStateAction<ErrorType | null>>,
    setEmailError: React.Dispatch<SetStateAction<ErrorType | null>>,
    setServiceError: React.Dispatch<SetStateAction<ErrorType | null>>,
    setAddOnError: React.Dispatch<SetStateAction<ErrorType | null>>,
    setUpgradeError: React.Dispatch<SetStateAction<ErrorType | null>>,
    setFileError: React.Dispatch<SetStateAction<ErrorType | null>>,
    setBookData: React.Dispatch<SetStateAction<Record<string, any> | null>>,
    setSelectedFile: React.Dispatch<SetStateAction<File | null>>,
    newCsrf?: string
) => Promise<void>

const makeAppointment: MakeAppointmentType = async(bookData, selectedFile, globalContext, setDateError, setTimeError, setNameError, setEmailError, setServiceError, setAddOnError, setUpgradeError, setFileError, setBookData, setSelectedFile, newCsrf)=> {    
    try{
        const formData = new FormData()

        if (bookData) {
            Object.entries(bookData).forEach(([key, value]) => {
                formData.append(key, value === null? "" : value)
            })
        }
    
        if (selectedFile) {
            setFileError(null)
            formData.append("refImage", selectedFile)
        } else {
            setFileError({msg: "Invalid Upload", isError: true})
        }
        await api.post("/api/appointments",
            formData
        , 
        {
            headers: {
                csrftoken: newCsrf? newCsrf : globalContext.csrf?.csrfToken
            }
        })
        setDateError(null)
        setTimeError(null)
        setNameError(null)
        setEmailError(null)
        setServiceError(null)
        setAddOnError(null)
        setUpgradeError(null)
        setFileError(null)
        setBookData(null)
        setSelectedFile(null)
    } catch(e) {
        const axiosError = e as AxiosError
        handleApiError(
            {
                axiosError: axiosError,
                status: axiosError.status,
                globalContext: globalContext,
                callbacks: {
                    handlePublicAuthRetry: () => makeAppointment(bookData, selectedFile, globalContext, setDateError, setTimeError, setNameError, setEmailError, setServiceError, setAddOnError, setUpgradeError, setFileError, setBookData, setSelectedFile),
                    handleCsrfRetry: (newCsrf) => makeAppointment(bookData, selectedFile, globalContext, setDateError, setTimeError, setNameError, setEmailError, setServiceError, setAddOnError, setUpgradeError, setFileError, setBookData, setSelectedFile, newCsrf)
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
                    },
                    {
                        errorName: "service",
                        setState: setServiceError
                    },
                    {
                        errorName: "addon",
                        setState: setAddOnError
                    },
                    {
                        errorName: "upgrade",
                        setState: setUpgradeError
                    }
                ]
            }
        )
    }
}

const BookForm: React.FC<BookFormProps> = ({selectedDate, times, baseServices, addOns, upgrades}) => {
    const [ bookData, setBookData ] = useState<Record<string, any> | null>(null)
    const [ dateError, setDateError ] = useState<ErrorType | null>(null)
    const [ timeError, setTimeError ] = useState<ErrorType | null>(null)
    const [ nameError, setNameError ] = useState<ErrorType | null>(null)
    const [ emailError, setEmailError ] = useState<ErrorType | null>(null)
    const [ serviceError, setServiceError ] = useState<ErrorType | null>(null)
    const [ addOnError, setAddOnError ] = useState<ErrorType | null>(null)
    const [ upgradeError, setUpgradeError ] = useState<ErrorType | null>(null)
    const [ fileError, setFileError ] = useState<ErrorType | null>(null)
    const [ selectedFile, setSelectedFile ] = useState<File | null>(null)
    const globalContext = useGlobalContext()

    return(
        <>
            <div className="book-form">
                <h1>Book Your Session</h1>
                <form className="book-form-inputs">
                    <BookInput label="Date" name="date" type="date" bookData={bookData} setBookData={setBookData} error={dateError} readonly={true} selectedDate={selectedDate}/>
                    <BookInput label="Time" name="time" type="" bookData={bookData} setBookData={setBookData} error={timeError} select={true} options={times} defaultMsg="Select a Time"/>
                    <BookInput label="Name" name="name" bookData={bookData} setBookData={setBookData} error={nameError} type="text"/>
                    <BookInput label="Email" name="email" bookData={bookData} setBookData={setBookData} error={emailError} type="text"/>
                    <BookInput label="Service" name="service" type="" bookData={bookData} setBookData={setBookData} error={serviceError} select={true} options={baseServices} defaultMsg="Select a Service"/>
                    <BookInput label="Add On" name="addOn" type="" bookData={bookData} setBookData={setBookData} error={addOnError} select={true} options={addOns} defaultMsg="Select an Addon"/>
                    <BookInput label="Upgrade" name="upgrade" type="" bookData={bookData} setBookData={setBookData} error={upgradeError} select={true} options={upgrades} defaultMsg="Select an Upgrade"/>
                    <BookFile selectedFile={selectedFile} setSelectedFile={setSelectedFile} error={fileError}/>
                </form>
                <p>*A $25 deposit is required to book an appointment</p>
                <div className="book-form-footer">
                    <button onClick={() => makeAppointment(
                        bookData, 
                        selectedFile, 
                        globalContext, 
                        setDateError, 
                        setTimeError, 
                        setNameError, 
                        setEmailError, 
                        setServiceError, 
                        setAddOnError, 
                        setUpgradeError, 
                        setFileError, 
                        setBookData,
                        setSelectedFile
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