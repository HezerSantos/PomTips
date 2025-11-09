import HomeHeader from "./components/homeHeader"
import '../../assets/styles/home/home.css'
import Navigation from "../../components/layouts/navigation"
import ReviewInfo from "./components/reviewInfo"
import NailView from "./components/nailView"
import GeneralInfo from "./components/generalInfo"
import Reviews from "./components/reviews"
import Footer from "../../components/layouts/footer"
const Home: React.FC = () => {
    return(
        <>
            <Navigation />
            <HomeHeader />
            <main>
                <ReviewInfo />
                <NailView />
                <GeneralInfo />
                <Reviews />
            </main>
            <Footer />
        </>
    )
}

export default Home