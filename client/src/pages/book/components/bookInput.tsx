interface BookInputProps {
    label: string
    name: string
}

const BookInput: React.FC<BookInputProps> = ({label, name}) => {
    return(
        <>
            <div className="book-input">
                <label htmlFor={label}>{label}</label>
                <input type="text" name={name} id={label}/>
            </div>
        </>
    )
}

export default BookInput