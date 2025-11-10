import Navigation from "../../components/layouts/navigation"
import ServicesHeader from "./components/servicesHeader"
import '../../assets/styles/services/services.css'
import ServicesContent from "./components/servicesContent"
import Footer from "../../components/layouts/footer"
const Services: React.FC = () => {
    return (
        <>
            <Navigation />
            <ServicesHeader />
            <main>
                <ServicesContent />
            </main>
            <Footer />
        </>
    )
}

export default Services