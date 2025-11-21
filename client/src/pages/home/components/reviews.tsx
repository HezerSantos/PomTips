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


interface ReviewsType {
    id: string,
    firstName: string,
    lastName: string,
    rating: number,
    review: string
}

interface ReviewsProps {
    reviews: ReviewsType[] | null
}

const Reviews: React.FC<ReviewsProps> = ({reviews}) => {
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
                        {reviews?.map(({firstName, lastName, review, rating, id}) => {
                            return (
                                <ReviewItem 
                                    name={`${firstName} ${lastName}`}
                                    text={review}
                                    stars={rating as 1 | 2 | 3 | 4 | 5}
                                    key={id}
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