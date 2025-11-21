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
import handleApiError from "../../app.config.error"
import { AxiosError } from "axios"
import FadeInSection from "../../components/layouts/fadeInSection"

interface NailInfoType {
    id: string
    name: string
    startingPrice: number
    imageUrl: string
}

interface ReviewsType {
    id: string,
    firstName: string,
    lastName: string,
    rating: number,
    review: string
}
const Home: React.FC = () => {
    const [ nailInfo, setNailInfo ] = useState<NailInfoType[] | null>(null)
    const [ reviews, setReviews ] = useState<ReviewsType[] | null>(null)
    const [ isLoading, setIsLoading ] = useState(false)
    const globalContext = useGlobalContext()
    useEffect(() => {
        const fetchNailInfo = async(newCsrf?: string) => {
            setIsLoading(true)
            try{
                const nailInfoRes = await api.get("/api/nails", {
                    headers: {
                        csrftoken: newCsrf? newCsrf : globalContext.csrf?.csrfToken
                    }
                })
                setNailInfo(nailInfoRes.data.nailInfo)
                setIsLoading(false)
            } catch (e) {
                const axiosError = e as AxiosError
                handleApiError({
                    axiosError: axiosError,
                    status: axiosError.status,
                    globalContext: globalContext,
                    callbacks: {
                        handlePublicAuthRetry: () => fetchNailInfo(),
                        handleCsrfRetry: (newCsrf) => fetchNailInfo(newCsrf)

                    }
                })
            }
        }

        const fetchReviews = async(newCsrf?: string) => {
            setIsLoading(true)
            try{
                const reviewsRes = await api.get("/api/reviews", {
                    headers: {
                        csrftoken: newCsrf? newCsrf : globalContext.csrf?.csrfToken
                    }
                })
                setReviews(reviewsRes.data.reviews)
                setIsLoading(false)
            } catch (e) {
                const axiosError = e as AxiosError
                handleApiError({
                    axiosError: axiosError,
                    status: axiosError.status,
                    globalContext: globalContext,
                    callbacks: {
                        handlePublicAuthRetry: () => fetchReviews(),
                        handleCsrfRetry: (newCsrf) => fetchReviews(newCsrf)

                    }
                })
            }
        }
        const fetch = async() => {
            await fetchNailInfo()
            await fetchReviews()
        }

        fetch()
    }, [])
    return(
        <>
            <Navigation />
            <HomeHeader />
            <main>
                <FadeInSection>
                    <ReviewInfo />
                </FadeInSection>
                <FadeInSection>
                    <NailView nailInfo={nailInfo} isLoading={isLoading}/>
                </FadeInSection>
                <FadeInSection>
                    <GeneralInfo />
                </FadeInSection>
                <FadeInSection>
                    <Reviews reviews={reviews}/>
                </FadeInSection>
            </main>
            <Footer />
        </>
    )
}

export default Home