import React, { SetStateAction, useEffect, useState } from "react"
interface ErrorType {
    msg: string,
    isError: boolean
}

interface BookInputProps {
    label: string
    name: string
    type: string
    setBookData: React.Dispatch<SetStateAction<Record<string, any> | null>>
    error?: ErrorType | null
    readonly?: boolean
    selectedDate?: Date | null
    select?: boolean
    options?: string[]
}

const BookInput: React.FC<BookInputProps> = ({label, name, type, setBookData, error, readonly, selectedDate, select, options}) => {
    const date = selectedDate? selectedDate.toISOString().split('T')[0] : null
    const [value, setValue] = useState("")
    const [ selectValue, setSelectValue ] = useState("")
    useEffect(() => {
        setBookData(prev => {
            const newBookData = {...prev}
            newBookData[name] = value
            return newBookData
        })
    }, [value])
    useEffect(() => {
        setBookData(prev => {
            const newBookData = {...prev}
            newBookData[name] = selectValue
            return newBookData
        })
    }, [selectValue])
    useEffect(() => {
        setBookData(prev => {
            const newBookData = {...prev}
            newBookData[name] = date
            return newBookData
        })
    }, [date])
    if (select){
        return (
            <>
                <div className="book-input">
                    <label htmlFor={label}>{label}</label>
                    <select name={name} id={label} value={selectValue} onChange={(e) => setSelectValue(e.target.value)} className={error?.isError? "input-error" : ""}>
                        <option value="" disabled>Select a Time</option>
                        {options?.map((option, i) => {
                            return(
                                <option value={option} key={i}>{option}</option>
                            )
                        })}
                    </select>
                    {error?.isError && <p className="input-message-error">*{error.msg}</p>}
                </div>
            </>
        )
    }
    return(
        <>
            <div className="book-input">
                <label htmlFor={label}>{label}</label>
                <input 
                    type={type} 
                    name={name} 
                    id={label} 
                    readOnly={readonly} 
                    value={date? date : value}
                    onChange={date? undefined : (e) => setValue(e.target.value)}
                    className={error?.isError? "input-error" : ""}
                />
                {error?.isError && <p className="input-message-error">*{error.msg}</p>}
            </div>
        </>
    )
}

export default BookInput