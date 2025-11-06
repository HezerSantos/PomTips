import HomeHeader from "./components/homeHeader"
import '../../assets/styles/home/home.css'
import Navigation from "../../components/layouts/navigation"
import ReviewInfo from "./components/reviewInfo"
const Home: React.FC = () => {
    return(
        <>
            <Navigation />
            <HomeHeader />
            <main>
                <ReviewInfo />
            </main>
        </>
    )
}

export default Home