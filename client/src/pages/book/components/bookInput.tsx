import React, { SetStateAction, useEffect, useState } from "react"
interface ErrorType {
    msg: string,
    isError: boolean
}

interface BookInputProps {
    label: string
    name: string
    type: string
    bookData: Record<string,any> | null
    setBookData: React.Dispatch<SetStateAction<Record<string, any> | null>>
    readonly?: boolean
    selectedDate?: Date | null
    select?: boolean
    options?: string[]
    defaultMsg?: string
    refactoredErrors?: Map<string, ErrorType | null>
}

const BookInput: React.FC<BookInputProps> = ({label, name, type, bookData, setBookData, readonly, selectedDate, select, options, defaultMsg, refactoredErrors}) => {
    let date = selectedDate? selectedDate.toISOString().split('T')[0] : null
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

    useEffect(() => {
        if (bookData === null){
            setValue("")
            setSelectValue("")
            date = null
        }
    }, [bookData])
    if (select){
        return (
            <>
                <div className="book-input">
                    <label htmlFor={label}>{label}</label>
                    <select name={name} id={label} value={selectValue} onChange={(e) => setSelectValue(e.target.value)} className={refactoredErrors?.get(name)?.isError? "input-error": ""}>
                        <option value="" disabled>{defaultMsg}</option>
                        {options?.map((option, i) => {
                            return(
                                <option value={option} key={i}>{option}</option>
                            )
                        })}
                    </select>
                    {refactoredErrors?.get(name)?.isError && <p className="input-message-error">*{refactoredErrors?.get(name)?.msg}</p>}
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
                    // className={error?.isError? "input-error" : ""}
                    className={refactoredErrors?.get(name)?.isError? "input-error": ""}
                />
                {refactoredErrors?.get(name)?.isError && <p className="input-message-error">*{refactoredErrors?.get(name)?.msg}</p>}
            </div>
        </>
    )
}

export default BookInput