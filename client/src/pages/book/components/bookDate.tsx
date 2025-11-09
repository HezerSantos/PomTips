interface BookDateProps {
    date: string
}
const BookDate: React.FC<BookDateProps> = ({date}) => {
    const day = date.split(" ")[2]
    return(
        <>
            <button>{day}</button>
        </>
    )
}

export default BookDate