import { useState } from "react"

interface BookInputProps {
    label: string
    name: string
    type: string
    readonly?: boolean
    selectedDate?: Date | null
    select?: boolean
    times?: string[]
}

const BookInput: React.FC<BookInputProps> = ({label, name, type, readonly, selectedDate, select, times}) => {
    const date = selectedDate? selectedDate.toISOString().split('T')[0] : null
    const [value, setValue] = useState("")
    if (select){
        return (
            <>
                <div className="book-input">
                    <label htmlFor={label}>{label}</label>
                    <select name={name} id={label}>
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