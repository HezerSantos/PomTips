import HomeHeader from "./components/homeHeader"
import '../../assets/styles/home/home.css'
import Navigation from "../../components/layouts/navigation"
const Home: React.FC = () => {
    return(
        <>
            <Navigation />
            <HomeHeader />
        </>
    )
}

export default Home