import HomeHeader from "./components/homeHeader"
import '../../assets/styles/home/home.css'
import Navigation from "../../components/layouts/navigation"
import ReviewInfo from "./components/reviewInfo"
import NailView from "./components/nailView"
import GeneralInfo from "./components/generalInfo"
import Reviews from "./components/reviews"
import Footer from "../../components/layouts/footer"
import { useEffect } from "react"
import api from "../../app.config"
import useGlobalContext from "../../customHooks/useGlobalContext"
const Home: React.FC = () => {
    const globalContext = useGlobalContext()
    useEffect(() => {
        const fetch = async() => {
            try{
                const res = await api.get("/api/nails", {
                    headers: {
                        csrftoken: globalContext.csrf?.csrfToken
                    }
                })
                console.log(res)
            } catch (e) {
                console.error(e)
            }
        }
        fetch()
    }, [])
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