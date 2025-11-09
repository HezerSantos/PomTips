import Footer from "../../components/layouts/footer"
import Navigation from "../../components/layouts/navigation"
import '../../assets/styles/book/book.css'
import BookForm from "./components/bookForm"
import BookCalendar from "./components/bookCalendar"
const Book: React.FC = () => {
    return(
        <>
        <div className="book-container">
            <header>
                <Navigation />
            </header>
            <main>
                <section className="page-section">
                    <div className="page-section__child book">
                        <BookForm />
                        <BookCalendar />
                    </div>
                </section>
            </main>
        </div>
            <Footer />
        </>
    )
}

export default Book