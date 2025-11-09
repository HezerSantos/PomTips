import BookInput from "./bookInput"

const BookForm: React.FC = () => {
    return(
        <>
            <div className="book-form">
                <h1>Book Your Session</h1>
                <div className="book-form-inputs">
                    <BookInput label="Date" name="date"/>
                    <BookInput label="Time" name="time"/>
                    <BookInput label="Name" name="name"/>
                    <BookInput label="Email" name="email"/>
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