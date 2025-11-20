import HomeHeader from "./components/homeHeader"
import '../../assets/styles/home/home.css'
import Navigation from "../../components/layouts/navigation"
import ReviewInfo from "./components/reviewInfo"
import NailView from "./components/nailView"
import GeneralInfo from "./components/generalInfo"
import Reviews from "./components/reviews"
import Footer from "../../components/layouts/footer"
import { useEffect, useState } from "react"
import api from "../../app.config"
import useGlobalContext from "../../customHooks/useGlobalContext"

interface NailInfoType {
    id: string
    name: string
    startingPrice: number
    imageUrl: string
}
const Home: React.FC = () => {
    const [ nailInfo, setNailInfo ] = useState<NailInfoType[] | null>(null)
    const [ isLoading, setIsLoading ] = useState(false)
    const globalContext = useGlobalContext()
    useEffect(() => {
        const fetch = async() => {
            setIsLoading(true)
            try{
                const res = await api.get("/api/nails", {
                    headers: {
                        csrftoken: globalContext.csrf?.csrfToken
                    }
                })
                setNailInfo(res.data.nailInfo)
                setIsLoading(false)
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
                <NailView nailInfo={nailInfo} isLoading={isLoading}/>
                <GeneralInfo />
                <Reviews />
            </main>
            <Footer />
        </>
    )
}

export default Home