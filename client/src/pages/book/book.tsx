import Footer from "../../components/layouts/footer"
import Navigation from "../../components/layouts/navigation"
import '../../assets/styles/book/book.css'
import BookForm from "./components/bookForm"
import BookCalendar from "./components/bookCalendar"
import { useState } from "react"
const Book: React.FC = () => {
    const [ selectedDate, setSelectedDate ] = useState<Date | null>(null)
    const [ times, _] = useState(["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"])
    return(
        <>
        <div className="book-container">
            <header>
                <Navigation />
            </header>
            <main>
                <section className="page-section">
                    <div className="page-section__child book">
                        <BookForm selectedDate={selectedDate} times={times}/>
                        <BookCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
                    </div>
                </section>
            </main>
        </div>
            <Footer />
        </>
    )
}

export default Book