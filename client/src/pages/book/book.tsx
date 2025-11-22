import Footer from "../../components/layouts/footer"
import Navigation from "../../components/layouts/navigation"
import '../../assets/styles/book/book.css'
import BookForm from "./components/bookForm"
import BookCalendar from "./components/bookCalendar"
import { useState } from "react"
import FadeInSection from "../../components/layouts/fadeInSection"
const Book: React.FC = () => {
    const [ selectedDate, setSelectedDate ] = useState<Date | null>(null)
    const [ times, _ ] = useState(["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"])
    const [baseServices] = useState([
        "Acrylic Full Set",
        "Acrylic Fill",
        "Gel-X Full Set",
        "Hard Gel Full Set",
        "Dip Powder Full Set",
        "Classic Manicure",
        "Gel Manicure",
        "Builder Gel (BIAB) Manicure",
        "Regular Pedicure",
        "Gel Pedicure",
    ]);
    const [addOns] = useState([
        "French Tips",
        "Simple Nail Art",
        "Advanced Nail Art",
        "Chrome",
        "Cat Eye",
        "Encapsulated Art",
        "Extra Long Length",
        "Shape Change",
        "Soak-Off Removal",
        "Nail Repair",
    ]);
    const [upgrades] = useState([
        "Gel Polish Upgrade",
        "Paraffin Treatment",
        "Deluxe Scrub",
        "Callus Removal",
    ]);
    return(
        <>
        <div className="book-container">
            <header>
                <Navigation />
            </header>
            <main>
                <FadeInSection>
                    <section className="page-section">
                        <div className="page-section__child book">
                            <BookForm selectedDate={selectedDate} times={times} baseServices={baseServices} addOns={addOns} upgrades={upgrades}/>
                            <BookCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
                        </div>
                    </section>
                </FadeInSection>
            </main>
        </div>
            <Footer />
        </>
    )
}

export default Book