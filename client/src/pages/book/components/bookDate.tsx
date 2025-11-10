import React, { SetStateAction } from "react"

interface BookDateProps {
    date: Date,
    selectedDate: Date | null
    setSelectedDate: React.Dispatch<SetStateAction<Date | null>>
}

const BookDate: React.FC<BookDateProps> = ({date, selectedDate, setSelectedDate}) => {
    const day = date.toString().split(" ")[2]
    const now = new Date()
    return(
        <>
            <button 
                disabled={now > date}
                onClick={() => setSelectedDate(date)}
                className={date === selectedDate? "date-selected" : ""}
            >
                {day}
            </button>
        </>
    )
}

export default BookDate