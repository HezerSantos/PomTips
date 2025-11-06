import HomeHeader from "./components/homeHeader"
import '../../assets/styles/home/home.css'
import Navigation from "../../components/layouts/navigation"
import ReviewInfo from "./components/reviewInfo"
import NailView from "./components/nailView"
const Home: React.FC = () => {
    return(
        <>
            <Navigation />
            <HomeHeader />
            <main>
                <ReviewInfo />
                <NailView />
            </main>
        </>
    )
}

export default Home