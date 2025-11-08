import React, { useRef} from 'react'
import reviewImage from '../../../assets/images/reviewImage.png'
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
interface ReviewItemProps {
    name: string
    text: string
    stars: 1 | 2 | 3 | 4 | 5
}


const reviews = [
    {
        name: "Isabella Cruz",
        text: "Absolutely obsessed! My Pom-inspired set turned out even better than I imagined — precise, comfy, and the staff made me feel pampered. I’ll be back every month.",
        stars: 4
    },
    {
        name: "Jasmine Lee",
        text: "Loved the attention to detail. The shape and color were perfect, and they lasted way longer than I expected. Highly recommend booking ahead!",
        stars: 5
    },
    {
        name: "Emily Tran",
        text: "Really good service and friendly atmosphere. Nails looked great, but I wish they had a few more color options available that day.",
        stars: 4
    },
    {
        name: "Sofia Hernandez",
        text: "Such a relaxing experience — they really take their time and make sure you’re happy with the final result. Worth every penny.",
        stars: 5
    },
    {
        name: "Maya Patel",
        text: "Clean salon, professional staff, and beautiful results. It’s hard to find consistent quality like this — definitely my new go-to spot.",
        stars: 5
    }
]

const ReviewItem: React.FC<ReviewItemProps> = ({name, text, stars}) => {
    const emptyStars = 5 - stars
    return(
        <>
            <div className='review-item'>
                <p>{name}</p>
                <p>{text}</p>
                <div>
                    {[...Array(stars)].map((_, i) => {
                        return(
                            <FaStar key={i} className='full-star'/>
                        )
                    })}
                    {[...Array(emptyStars)].map((_, i)=> {
                        return(
                            <FaRegStar key={i} className='empty-star'/>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

type ReviewScrollType = (reviewContainer: React.RefObject<HTMLDivElement | null>) => void


const scrollRight: ReviewScrollType = (reviewContainer) => {
    const containerWidth = (reviewContainer.current?.clientWidth || 0 ) / 3
    reviewContainer.current?.scrollBy({left: -containerWidth, behavior: 'smooth'})
}
const scrollLeft: ReviewScrollType = (reviewContainer) => {
    const containerWidth = (reviewContainer.current?.clientWidth || 0 ) / 3
    reviewContainer.current?.scrollBy({left: containerWidth, behavior: 'smooth'})
}

const Reviews: React.FC = () => {
    const reviewContainer = useRef<HTMLDivElement | null>(null)
    return(
        <>
            <section className="page-section">
                <div className="page-section__child reviews">
                    <div className="reviews-image">
                        <img src={reviewImage} alt="" />
                    </div>
                    <div className="review-view-scroll-buttons">
                        <button onClick={() => scrollLeft(reviewContainer)}>
                            <IoIosArrowDropleft />
                        </button>
                        <button onClick={() => scrollRight(reviewContainer)}>
                            <IoIosArrowDropright />
                        </button>
                    </div>
                    <div className='reviews-container' ref={reviewContainer}>
                        {reviews.map(({name, text, stars}, index) => {
                            return (
                                <ReviewItem 
                                    name={name}
                                    text={text}
                                    stars={stars as 1 | 2 | 3 | 4 | 5}
                                    key={index}
                                />
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Reviews