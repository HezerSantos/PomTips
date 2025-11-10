import { useState } from "react"
import BookInput from "./bookInput"

interface BookFormProps {
    selectedDate: Date | null
    times: string[]
}
const BookForm: React.FC<BookFormProps> = ({selectedDate, times}) => {
    const [ bookData, setBookData ] = useState<Record<string, any> | null>(null)
    return(
        <>
            <div className="book-form">
                <h1>Book Your Session</h1>
                <div className="book-form-inputs">
                    <BookInput label="Date" name="date" type="date" setBookData={setBookData} readonly={true} selectedDate={selectedDate}/>
                    <BookInput label="Time" name="time" type="" setBookData={setBookData} select={true} times={times}/>
                    <BookInput label="Name" name="name" setBookData={setBookData} type="text"/>
                    <BookInput label="Email" name="email" setBookData={setBookData} type="text"/>
                </div>
                <p>*A $25 deposit is required to book an appointment</p>
                <div className="book-form-footer">
                    <button>Book Session</button>
                    <p>*By clicking this you agree to our Terms</p>
                </div>
            </div>
        </>
    )
}

export default BookForm