import React, { SetStateAction, useEffect, useState } from "react"

interface BookInputProps {
    label: string
    name: string
    type: string
    setBookData: React.Dispatch<SetStateAction<Record<string, any> | null>>
    readonly?: boolean
    selectedDate?: Date | null
    select?: boolean
    times?: string[]
}

const BookInput: React.FC<BookInputProps> = ({label, name, type, setBookData, readonly, selectedDate, select, times}) => {
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
                    <select name={name} id={label} value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
                        <option value="" disabled>Select a Time</option>
                        {times?.map((time, i) => {
                            return(
                                <option value={time} key={i}>{time}</option>
                            )
                        })}
                    </select>
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
                />
            </div>
        </>
    )
}

export default BookInput